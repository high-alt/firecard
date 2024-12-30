"use client"
import createCache from "@emotion/cache"
import { useRouter, useServerInsertedHTML } from "next/navigation"
import { CacheProvider } from "@emotion/react"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import React, { createContext, useEffect, useState } from "react"
import theme from "utils/theme"
import {
  SigninResultType,
  SignupResultType,
  UserType,
  UserSigninType,
  UserSignupType,
} from "utils/types"
import { fetchFn } from "./api"

export const signin = async ({ usernameoremail, password }: UserSigninType) => {
  const res = await fetchFn<SigninResultType>(`/User/signin`, {
    method: "POST",
    body: JSON.stringify({
      usernameoremail: usernameoremail,
      password: password,
    }),
  })
  if (res.token) {
  }
  console.log(res)
  return res
}

export const signup = async ({ email, password, role }: UserSignupType) => {
  const res = await fetchFn<SignupResultType>(`/User/signup`, {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
      role: role,
    }),
  })
  if (res.token) {
  }
  console.log(res)
  return res
}

export type UserContextType = UserType & {
  login: (u: UserSigninType) => void
  logout: () => void
}
export const UserContext = createContext<UserContextType | null>(null)

export default function AppContext(props: any) {
  const { options, children } = props
  const token =  null
  const [user, setUser] = useState<UserType | null>({} as UserType)
  const router = useRouter()
  useEffect(() => {
    if (!!token) {
      const decoded: UserType = {}
      setUser(decoded)
    }
  }, [token])

  const logout = () => {
    setUser(null)
  }
  const login = async (u: UserSigninType) => {
    const res = await signin(u)
    if (res.token) {
      const user: UserType = {}
      setUser(user)
      router.replace("/")
    }
  }
  const [{ cache, flush }] = React.useState(() => {
    const cache = createCache(options)
    cache.compat = true
    const prevInsert = cache.insert
    let inserted: string[] = []
    cache.insert = (...args) => {
      const serialized = args[1]
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name)
      }
      return prevInsert(...args)
    }
    const flush = () => {
      const prevInserted = inserted
      inserted = []
      return prevInserted
    }
    return { cache, flush }
  })

  useServerInsertedHTML(() => {
    const names = flush()
    if (names.length === 0) {
      return null
    }
    let styles = ""
    for (const name of names) {
      styles += cache.inserted[name]
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(" ")}`}
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    )
  })

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <UserContext.Provider value={{ ...user, login, logout }}>
          {children}
        </UserContext.Provider>
      </ThemeProvider>
    </CacheProvider>
  )
}
