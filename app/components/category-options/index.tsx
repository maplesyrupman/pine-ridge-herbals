import { Dispatch, SetStateAction } from "react";
import MobileCategoryOptions from "./mobile";
import DesktopCategoryOptions from "./desktop";

type Option = {
    value: string,
    label: string
}

interface Filter {
    id: string,
    name: string,
    options: Option[]
}

interface Props {
    mobileFiltersOpen: boolean,
    setMobileFiltersOpen: Dispatch<SetStateAction<boolean>>,
    filters: Filter[]
}

export {
    MobileCategoryOptions,
    DesktopCategoryOptions,
}

export type {
    Option,
    Filter,
    Props
}