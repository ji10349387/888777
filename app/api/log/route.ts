import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { category, query } = await request.json()
  
  // 这里应该是实际的日志记录逻辑
  // 例如，将日志写入数据库或文件系统
  console.log(`Log: Category: ${category}, Query: ${query}`)

  // 在实际应用中，你可能想要使用更安全的存储方式
  // 这里我们简单地使用了服务器端的控制台日志

  return NextResponse.json({ success: true })
}

