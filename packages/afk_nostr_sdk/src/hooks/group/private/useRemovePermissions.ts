import {useMutation} from '@tanstack/react-query';
import {useNostrContext} from '../../../context/NostrContext';
import {NDKEvent, NDKKind} from '@nostr-dev-kit/ndk';
import {AdminGroupPermission} from './useAddPermissions';
import { useAuth } from '../../../store';

// TODO
export const useRemovePermissions = () => {
  const {ndk} = useNostrContext();
  const {publicKey} = useAuth();

  return useMutation({
    mutationKey: ['removePermissions', ndk],
    mutationFn: async (data: {
      pubkey: string;
      permissionName: AdminGroupPermission[];
      groupId: string;
    }) => {
      const event = new NDKEvent(ndk);
      event.kind = 9004 // NDKKind.GroupAdminRemovePermission;

      event.tags = [
        ['d', data.groupId],
        ['p', data.pubkey, ...data.permissionName],
      ];
      return event.publish();
    },
  });
};
