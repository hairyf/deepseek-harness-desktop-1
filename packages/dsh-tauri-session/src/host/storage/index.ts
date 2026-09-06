/**
 * host/storage.ts — 旧版（v1）自持归档的持久化（新机制由宿主 WorkspaceRegistry
 * 持有归档集合；本文件只在启动迁移时读写旧 `archive.json`）。
 *
 * 适配 unstorage(fs)：读走 getItem（自动 JSON 解析），写经 dsh-tauri 的
 * createAtomicFsStorage（tmp+rename 原子写），读者永远看不到半份 JSON。
 * 模块级单例 `storage`：消费方直接 storage.getItem / storage.setItem，
 * 不关心 DSH_HOME 位置、不传 dshHome 参数。
 */

import { homedir } from 'node:os'
import process from 'node:process'
import { createAtomicFsStorage } from 'dsh-tauri'
import { join } from 'pathe'
import { SESSION_STATE_DIRECTORY } from '../constants'

/** 插件自持状态目录（默认 `$DSH_HOME/dsh-tauri-session`）。 */
export function sessionStateDir(): string {
  return join(process.env.DSH_HOME ?? join(homedir(), '.dsh'), SESSION_STATE_DIRECTORY)
}

/** 旧版归档存储（模块级单例；key 即 base 下相对路径，`:` 为子目录分隔符）。 */
export const storage = createAtomicFsStorage(sessionStateDir())
