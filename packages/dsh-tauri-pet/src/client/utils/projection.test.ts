import { describe, expect, it } from 'vitest'
import { deepEqual, PET_FORWARDED_FIELDS, projectPetPayload } from './projection'

describe('projectPetPayload', () => {
  it('只投影白名单字段，且缺省字段不补默认值', () => {
    const merged = {
      id: 's1',
      sessionId: 's1',
      title: '会话',
      status: 'running',
      unused: { deep: true },
      extraField: 1,
    }
    expect(projectPetPayload(merged)).toEqual({
      id: 's1',
      sessionId: 's1',
      title: '会话',
      status: 'running',
    })
  })

  it('独立附带 liveActivity（仅存在时）', () => {
    expect(projectPetPayload({ id: 's1', liveActivity: { kind: 'tool', name: 'pwsh' } }))
      .toEqual({ id: 's1', liveActivity: { kind: 'tool', name: 'pwsh' } })
    // 无 liveActivity 时不制造空字段
    expect(projectPetPayload({ id: 's1' })).toEqual({ id: 's1' })
  })

  it('白名单包含桌宠窗口消费的全部字段', () => {
    expect([...PET_FORWARDED_FIELDS]).toEqual(expect.arrayContaining([
      'id',
      'sessionId',
      'title',
      'displayTitle',
      'name',
      'description',
      'message',
      'status',
      'activity',
      'phase',
      'running',
      'pendingInteraction',
      'pending',
      'lastAgentError',
    ]))
  })
})

describe('deepEqual', () => {
  it('基础值与 null 比较', () => {
    expect(deepEqual(1, 1)).toBe(true)
    expect(deepEqual('a', 'a')).toBe(true)
    expect(deepEqual(null, null)).toBe(true)
    expect(deepEqual(1, 2)).toBe(false)
    expect(deepEqual('a', 'b')).toBe(false)
    expect(deepEqual(null, undefined)).toBe(false)
    expect(deepEqual(1, '1')).toBe(false)
  })

  it('对象比较', () => {
    expect(deepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } })).toBe(true)
    expect(deepEqual({ a: 1 }, { a: 1, b: 2 })).toBe(false)
    expect(deepEqual({ a: 1 }, { a: 2 })).toBe(false)
    expect(deepEqual({ a: 1 }, { b: 1 })).toBe(false)
  })

  it('数组与嵌套比较（长度/顺序敏感）', () => {
    expect(deepEqual([1, { x: 2 }], [1, { x: 2 }])).toBe(true)
    expect(deepEqual([1, 2], [1, 2, 3])).toBe(false)
    expect(deepEqual([1, 2], [2, 1])).toBe(false)
  })
})
