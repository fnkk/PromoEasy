// src/pages/launchpad/callback.jsx
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function CallbackPage() {
  const { isLoading, error } = useAuth0();

  useEffect(() => {
    // 这里什么都不用写，Auth0Provider 会自动处理 token 解析
    // 如果需要，可以在成功后重定向到其他页面
  }, []);

  if (isLoading) return <div>正在登录中...</div>;
  if (error) return <div>登录出错: {error.message}</div>;

  return <div>登录成功，正在跳转...</div>;
}