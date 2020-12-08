import { BigInt } from "@graphprotocol/graph-ts"
import {
  AdminUpgradeabilityProxy,
  AdminChanged,
  Upgraded
} from "../generated/AdminUpgradeabilityProxy/AdminUpgradeabilityProxy"
import { _AdminChanged, _Upgraded } from "../generated/schema"

export function handleAdminChanged(event: AdminChanged): void {
  let entity = _AdminChanged.load(event.params.newAdmin.toHex())
  if (entity == null) {
    entity = new _AdminChanged(event.params.newAdmin.toHex())
    entity.count = BigInt.fromI32(0)
  }

  entity.count = entity.count + BigInt.fromI32(1)
  entity.previousAdmin = event.params.previousAdmin
  entity.newAdmin = event.params.newAdmin
  entity.save()
}

export function handleUpgraded(event: Upgraded): void {
  let entity = _Upgraded.load(event.params.implementation.toHex())
  if (entity == null) {
    entity = new _Upgraded(event.params.implementation.toHex())
    entity.count = BigInt.fromI32(0)
  }

  entity.count = entity.count + BigInt.fromI32(1)
  entity.implementation = event.params.implementation
  entity.save()
}
