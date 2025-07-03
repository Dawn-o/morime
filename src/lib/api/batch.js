import { RATE_LIMIT } from '@/lib/api/config';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Execute multiple API requests with proper rate limiting
 * @param {Array} requests - Array of async functions that return promises
 * @param {Object} options - Configuration options
 * @returns {Promise<Array>} - Array of results in the same order as requests
 */
export async function batchRequests(requests, options = {}) {
  const {
    sequential = true, // Execute requests sequentially by default
    delayBetween = RATE_LIMIT.queueDelay,
    maxConcurrent = 2, // Maximum concurrent requests when not sequential
    failFast = false // Whether to stop on first error
  } = options;

  if (sequential) {
    return executeSequentially(requests, delayBetween, failFast);
  } else {
    return executeConcurrently(requests, maxConcurrent, failFast);
  }
}

/**
 * Execute requests one after another with delays
 */
async function executeSequentially(requests, delayBetween, failFast) {
  const results = [];

  for (let i = 0; i < requests.length; i++) {
    try {
      // Add delay before request (except for the first one)
      if (i > 0 && delayBetween > 0) {
        await delay(delayBetween);
      }

      const result = await requests[i]();
      results.push(result);
    } catch (error) {
      if (failFast) {
        throw error;
      }

      console.warn(`Request ${i + 1} failed:`, error.message);
      results.push({ error: error.message, data: null });
    }
  }

  return results;
}

/**
 * Execute requests with controlled concurrency
 */
async function executeConcurrently(requests, maxConcurrent, failFast) {
  const results = new Array(requests.length);
  const executing = [];

  for (let i = 0; i < requests.length; i++) {
    const requestPromise = executeWithIndex(requests[i], i, results, failFast);
    executing.push(requestPromise);

    if (executing.length >= maxConcurrent) {
      await Promise.race(executing);
      // Remove completed promises
      for (let j = executing.length - 1; j >= 0; j--) {
        if (executing[j].completed) {
          executing.splice(j, 1);
        }
      }
    }
  }

  // Wait for remaining requests
  await Promise.all(executing);
  return results;
}

async function executeWithIndex(requestFn, index, results, failFast) {
  try {
    const result = await requestFn();
    results[index] = result;
    return { completed: true, success: true };
  } catch (error) {
    if (failFast) {
      throw error;
    }

    console.warn(`Request ${index + 1} failed:`, error.message);
    results[index] = { error: error.message, data: null };
    return { completed: true, success: false };
  }
}

/**
 * Helper function for common homepage data loading pattern
 */
export async function loadHomePageData(requests) {
  return batchRequests(requests, {
    sequential: true,
    delayBetween: RATE_LIMIT.queueDelay,
    failFast: false
  });
}
