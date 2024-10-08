import {useMutation} from '@tanstack/react-query';
import {useNostrContext} from '../../../context/NostrContext';
import {NDKEvent, NDKKind} from '@nostr-dev-kit/ndk';
import {checkGroupPermission} from './useGetPermission';
import {useAuth} from '../../../store';
import {AdminGroupPermission} from './useAddPermissions';

// TODO
export const useDeleteGroup = () => {
  const {ndk} = useNostrContext();
  const {publicKey: pubkey} = useAuth();

  return useMutation({
    mutationKey: ['deleteGroup', ndk],
    mutationFn: async (data: {groupId: string}) => {
      const hasPermission = checkGroupPermission({
        groupId: data.groupId,
        ndk,
        pubkey,
        action: AdminGroupPermission.DeleteGroup,
      });

      if (!hasPermission) {
        throw new Error('You do not have permission to delete group');
      }
      const event = new NDKEvent(ndk);
      event.kind =  9008 // NDKKind.GroupAdminDeleteGroup;
      event.tags = [['d', data.groupId]];
      return event.publish();
    },
  });
};
