import jwt from "jsonwebtoken"

export async function auth(request: Request) {
  try {
    // Get token from header
    const authHeader = request.headers.get("authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return null
    }

    const token = authHeader.split(" ")[1]

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "default_secret") as { id: string }

    return decoded.id
  } catch (error) {
    return null
  }
}
