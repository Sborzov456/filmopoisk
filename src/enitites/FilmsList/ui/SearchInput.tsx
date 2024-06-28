import Input from '@/shared/ui/input/Input';
import React from 'react';

type SearchInputProps = {
    onChange: (value: string) => void
};

export default function SearchInput({onChange}: SearchInputProps) {
    return <>
        <Input onChange={onChange} />;
    </> 
    
}
