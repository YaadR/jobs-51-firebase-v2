import useCurrentUserQuery from "./useCurrentUserQuery";

export default function useCurrentUserRoleQuery() {
  return useCurrentUserQuery({
    select: v => v?.role
  })
}
