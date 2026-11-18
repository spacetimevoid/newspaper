export const LOGIN_ERROR = "Không thể đăng nhập. Vui lòng kiểm tra thông tin hoặc thử lại sau.";
export type Identity = Readonly<{ id: string; email?: string }>;
export type AuthGateway = {
  user(): Promise<Identity | null>;
  allowed(id: string): Promise<boolean>;
  signIn(email: string, password: string): Promise<boolean>;
  signOut(): Promise<boolean>;
};

// Only this known protected destination is currently supported. No arbitrary URL is trusted.
export function safeAdminRedirect(value: unknown): string {
  const destinations = ["/admin/articles"];
  return typeof value === "string" && destinations.includes(value) ? value : "/admin/articles";
}

export async function checkAdmin(gateway: AuthGateway): Promise<Identity | null> {
  try {
    const user = await gateway.user();
    return user && await gateway.allowed(user.id) ? user : null;
  } catch { return null; }
}

export async function authenticateAdmin(gateway: AuthGateway, email: string, password: string): Promise<Identity | null> {
  try {
    if (!email || !password || email.length > 254 || password.length > 4096 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
    if (!await gateway.signIn(email, password)) return null;
    const admin = await checkAdmin(gateway);
    if (!admin) await gateway.signOut();
    return admin;
  } catch { return null; }
}

export async function endSession(gateway: AuthGateway): Promise<boolean> {
  try { return await gateway.signOut(); } catch { return false; }
}
