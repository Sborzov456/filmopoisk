import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

type QueryParamState = [string | null, (value: string | null) => void];

export function useRouterQueryParams(name: string): QueryParamState {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const [searchParams, setSearchParams] = useSearchParams();
    const [value, setValue] = useState<string | null>(queryParams.get(name) ?? null);
    const updateValue = useCallback(
        (value: string | null) => {
            setValue(value);
            if (!value) {
                searchParams.delete(name);
            } else {
                searchParams.set(name, value);
            }
            setSearchParams(searchParams);
        },
        [searchParams, name, setSearchParams]
    );

    useEffect(() => {
        const param = searchParams.get(name);
        if (value !== param) {
            setValue(param ?? null);
        }
    }, [searchParams]);

    return [value, updateValue];
}
