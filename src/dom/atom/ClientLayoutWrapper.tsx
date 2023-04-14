"use client";

import AuthProvider from '@/../script/state/context/UserContext'

function RootLayoutProvider({
    session,
  children,
}: {
    session: any,
  children: React.ReactElement
}) {
  
  return (
    <AuthProvider {...{session}}>
      {children}
    </AuthProvider>
  )
}

export default RootLayoutProvider;