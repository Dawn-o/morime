'use server'

import { cookies } from 'next/headers'

export async function setSfwCookie(value) {
  const cookieStore = await cookies()
  cookieStore.set('sfw', value, { 
    path: '/',
    maxAge: 31536000, // 1 year
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  })
  return value
}

export async function getSfwCookie() {
  const cookieStore = await cookies()
  const cookie = cookieStore.get('sfw')
  return cookie?.value === 'false' ? false : true
}