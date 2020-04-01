import { useLocation, useHistory } from "react-router-dom";
import { useCallback, useMemo } from "react";

export function useQuery(
  name: string,
  defaultValue: string
): [string, (value: string) => void];
export function useQuery(
  name: string,
  defaultValue?: string
): [string | null, (value: string) => void] {
  const location = useLocation();
  const history = useHistory();
  const params = useMemo(() => new URLSearchParams(location.search), [
    location.search
  ]);

  const replaceQuery = useCallback(
    (value: string) => {
      params.set(name, value);
      history.replace({ search: "?" + params });
    },
    [history, name, params]
  );

  if (defaultValue && !params.has(name)) {
    replaceQuery(defaultValue);

    return [params.get(name)!, replaceQuery];
  }

  return [params.get(name), replaceQuery];
}
