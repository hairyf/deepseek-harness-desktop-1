/**
 * service/skills.ts — 技能管理注入面组装（SkillsInjected 装配）。
 *
 * 错误归一由 dsh-tauri 的 JSON 客户端统一承担，apis/ 直接返回解析后的类型；
 * 本文件只做 SkillsTab 消费的注入面组装。
 */
import type { SkillsInjected } from '../types'
import {
  getSkill,
  getSkills,
  postOpen,
  postRootsAdd,
  postSkillDelete,
  postSkillPolicy,
  postSkillSave,
  postSkillsRefresh,
} from '../apis'

export function createSkillsInjected(): SkillsInjected {
  return {
    list: () => getSkills(),
    refresh: () => postSkillsRefresh(),
    get: name => getSkill(name),
    save: input => postSkillSave(input),
    remove: name => postSkillDelete({ name }),
    policy: (name, enabled) => postSkillPolicy({ name, enabled }),
    open: target => postOpen(target),
    importRepository: url => postRootsAdd(url),
  }
}
