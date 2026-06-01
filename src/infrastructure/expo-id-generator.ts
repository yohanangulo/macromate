import * as Crypto from 'expo-crypto'
import { IdGenerator } from '@/core/shared/id-generator'

export class ExpoIdGenerator implements IdGenerator {
  generate(): string {
    return Crypto.randomUUID()
  }
}
