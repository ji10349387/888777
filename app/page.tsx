'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Category = '京东e卡' | '天猫超市卡'

const VALID_INPUT_REGEX = /^[A-Za-z0-9]{18}$/;

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<Category>('京东e卡')
  const [results, setResults] = useState<string[]>([])
  const [isValidInput, setIsValidInput] = useState(true)

  const handleSearch = async () => {
    if (VALID_INPUT_REGEX.test(query)) {
      setResults([
        `${category}: ${query} - 这是一张全新未使用和绑定的卡密`,
        `${category}: ${query} - 这是一张全新未使用和绑定的卡密`,
        `${category}: ${query} - 这是一张全新未使用和绑定的卡密`,
      ]);
      setIsValidInput(true);
    } else {
      setResults([`${category}: ${query} - 无效卡`]);
      setIsValidInput(false);
    }

    // 记录查询
    try {
      await fetch('/api/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category, query }),
      });
    } catch (error) {
      console.error('Failed to log query:', error);
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">礼品卡查询网站</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 mb-4">
            <Select value={category} onValueChange={(value: Category) => setCategory(value)}>
              <SelectTrigger>
                <SelectValue placeholder="选择查询类目" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="京东e卡">京东e卡</SelectItem>
                <SelectItem value="天猫超市卡">天猫超市卡</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex flex-col space-y-2">
              <div className="flex space-x-2">
                <Input
                  type="text"
                  placeholder="输入18位字母或数字"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setIsValidInput(VALID_INPUT_REGEX.test(e.target.value));
                  }}
                  className={`flex-grow ${!isValidInput && query ? 'border-red-500' : ''}`}
                  maxLength={18}
                />
                <Button onClick={handleSearch}>查询</Button>
              </div>
              {!isValidInput && query && (
                <p className="text-red-500 text-sm">请输入18位字母或数字</p>
              )}
            </div>
          </div>
          {results.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-2">查询结果:</h2>
              <ul className="space-y-2">
                {results.map((result, index) => (
                  <li key={index} className={`p-2 rounded-md ${result.includes('无效卡') ? 'bg-red-100' : 'bg-green-100'}`}>
                    {result}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

