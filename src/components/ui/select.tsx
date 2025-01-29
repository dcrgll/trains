import { Check, ChevronDown, X } from 'lucide-react'
import React, { type ReactElement } from 'react'
import SelectComponent, {
  components,
  createFilter,
  type ClassNamesConfig,
  type ClearIndicatorProps,
  type DropdownIndicatorProps,
  type GroupBase,
  type MenuListProps,
  type MenuProps,
  type MultiValueRemoveProps,
  type OptionProps,
  type Props,
  type SelectInstance,
  type StylesConfig
} from 'react-select'
import { FixedSizeList as List } from 'react-window'

import { cn } from '@/lib/utils'

/** select option type */
export type OptionType = { label: string; value: string | number }

/**
 * styles that aligns with shadcn/ui
 */
const selectStyles = {
  controlStyles: {
    base: 'flex !min-h-9 w-full rounded-md border border-input bg-transparent pl-3 py-1 pr-1 gap-1 text-sm shadow-sm transition-colors hover:cursor-pointer',
    focus: 'outline-none ring-1 ring-ring',
    disabled: 'cursor-not-allowed opacity-50'
  },
  placeholderStyles: 'text-muted-foreground text-sm ml-1 font-medium',
  valueContainerStyles: 'gap-1',
  multiValueStyles:
    'inline-flex items-center gap-2 rounded-md border border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 px-1.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  indicatorsContainerStyles: 'gap-1',
  clearIndicatorStyles: 'p-1 rounded-md',
  indicatorSeparatorStyles: 'bg-muted',
  dropdownIndicatorStyles: 'p-1 rounded-md',
  menu: 'mt-1.5 p-1.5 border border-input bg-background text-sm rounded-lg',
  menuList: 'morel-scrollbar',
  groupHeadingStyles:
    'py-2 px-1 text-secondary-foreground text-sm font-semibold',
  optionStyles: {
    base: 'hover:cursor-pointer hover:bg-accent hover:text-accent-foreground px-2 py-1.5 rounded-sm !text-sm !cursor-default !select-none !outline-none font-sans',
    focus: 'active:bg-accent/90 bg-accent text-accent-foreground',
    disabled: 'pointer-events-none opacity-50',
    selected: ''
  },
  noOptionsMessageStyles:
    'text-muted-foreground py-4 text-center text-sm border border-border rounded-sm',
  label: 'text-muted-foreground text-sm',
  loadingIndicatorStyles: 'flex items-center justify-center h-4 w-4 opacity-50',
  loadingMessageStyles: 'text-accent-foreground p-2 bg-accent'
}

/**
 * This factory method is used to build custom classNames configuration
 */
export const createClassNames = (
  classNames: ClassNamesConfig<OptionType, boolean, GroupBase<OptionType>>
): ClassNamesConfig<OptionType, boolean, GroupBase<OptionType>> => {
  return {
    clearIndicator: state =>
      cn(
        selectStyles.clearIndicatorStyles,
        classNames?.clearIndicator?.(state)
      ),
    container: state => cn(classNames?.container?.(state)),
    control: state =>
      cn(
        selectStyles.controlStyles.base,
        state.isDisabled && selectStyles.controlStyles.disabled,
        state.isFocused && selectStyles.controlStyles.focus,
        classNames?.control?.(state)
      ),
    dropdownIndicator: state =>
      cn(
        selectStyles.dropdownIndicatorStyles,
        classNames?.dropdownIndicator?.(state)
      ),
    group: state => cn(classNames?.group?.(state)),
    groupHeading: state =>
      cn(selectStyles.groupHeadingStyles, classNames?.groupHeading?.(state)),
    indicatorsContainer: state =>
      cn(
        selectStyles.indicatorsContainerStyles,
        classNames?.indicatorsContainer?.(state)
      ),
    indicatorSeparator: state =>
      cn(
        selectStyles.indicatorSeparatorStyles,
        classNames?.indicatorSeparator?.(state)
      ),
    input: state => cn(classNames?.input?.(state)),
    loadingIndicator: state =>
      cn(
        selectStyles.loadingIndicatorStyles,
        classNames?.loadingIndicator?.(state)
      ),
    loadingMessage: state =>
      cn(
        selectStyles.loadingMessageStyles,
        classNames?.loadingMessage?.(state)
      ),
    menu: state => cn(selectStyles.menu, classNames?.menu?.(state)),
    menuList: state => cn(classNames?.menuList?.(state)),
    menuPortal: state => cn(classNames?.menuPortal?.(state)),
    multiValue: state =>
      cn(selectStyles.multiValueStyles, classNames?.multiValue?.(state)),
    multiValueLabel: state => cn(classNames?.multiValueLabel?.(state)),
    multiValueRemove: state => cn(classNames?.multiValueRemove?.(state)),
    noOptionsMessage: state =>
      cn(
        selectStyles.noOptionsMessageStyles,
        classNames?.noOptionsMessage?.(state)
      ),
    option: state =>
      cn(
        selectStyles.optionStyles.base,
        state.isFocused && selectStyles.optionStyles.focus,
        state.isDisabled && selectStyles.optionStyles.disabled,
        state.isSelected && selectStyles.optionStyles.selected,
        classNames?.option?.(state)
      ),
    placeholder: state =>
      cn(selectStyles.placeholderStyles, classNames?.placeholder?.(state)),
    singleValue: state => cn(classNames?.singleValue?.(state)),
    valueContainer: state =>
      cn(selectStyles.valueContainerStyles, classNames?.valueContainer?.(state))
  }
}

export const defaultClassNames = createClassNames({})
export const defaultStyles: StylesConfig<
  OptionType,
  boolean,
  GroupBase<OptionType>
> = {
  input: base => ({
    ...base,
    'input:focus': {
      boxShadow: 'none'
    }
  }),
  multiValueLabel: base => ({
    ...base,
    whiteSpace: 'normal',
    overflow: 'visible'
  }),
  control: base => ({
    ...base,
    transition: 'none'
    // minHeight: '2.25rem', // we used !min-h-9 instead
  }),
  menuList: base => ({
    ...base,
    '::-webkit-scrollbar': {
      background: 'transparent'
    },
    '::-webkit-scrollbar-track': {
      background: 'transparent'
    },
    '::-webkit-scrollbar-thumb': {
      background: 'hsl(var(--border))'
    },
    '::-webkit-scrollbar-thumb:hover': {
      background: 'transparent'
    }
  })
}

/**
 * React select custom components
 */
export const DropdownIndicator = (
  props: DropdownIndicatorProps<OptionType>
) => {
  return (
    <components.DropdownIndicator {...props}>
      <ChevronDown className='h-4 w-4 opacity-50' />
    </components.DropdownIndicator>
  )
}

export const ClearIndicator = (props: ClearIndicatorProps<OptionType>) => {
  return (
    <components.ClearIndicator {...props}>
      <X className='h-4 w-4 opacity-50' />
    </components.ClearIndicator>
  )
}

export const MultiValueRemove = (props: MultiValueRemoveProps<OptionType>) => {
  return (
    <components.MultiValueRemove {...props}>
      <X className='h-3.5 w-3.5 opacity-50' />
    </components.MultiValueRemove>
  )
}

export const Option = (props: OptionProps<OptionType>) => {
  return (
    <components.Option {...props}>
      <div className='flex items-center justify-between'>
        <div>{props.label}</div>
        {props.isSelected && <Check className='h-4 w-4 opacity-50' />}
      </div>
    </components.Option>
  )
}

// Using Menu and MenuList fixes the scrolling behavior
export const Menu = (props: MenuProps<OptionType>) => {
  return <components.Menu {...props}>{props.children}</components.Menu>
}

export const MenuList = (props: MenuListProps<OptionType>) => {
  const { children, maxHeight } = props

  const childrenArray = React.Children.toArray(children)

  const calculateHeight = () => {
    // When using children it resizes correctly
    const totalHeight = childrenArray.length * 35 // Adjust item height if different
    return totalHeight < maxHeight ? totalHeight : maxHeight
  }

  const height = calculateHeight()

  // Ensure childrenArray has length. Even when childrenArray is empty there is one element left
  if (!childrenArray || childrenArray.length - 1 === 0) {
    return <components.MenuList {...props} />
  }
  return (
    <List
      height={height}
      itemCount={childrenArray.length}
      itemSize={35} // Adjust item height if different
      width='100%'
    >
      {({ index, style }: { index: number; style: React.CSSProperties }) => (
        <div style={style}>{childrenArray[index]}</div>
      )}
    </List>
  )
}

const BaseSelect = <IsMulti extends boolean = false>(
  props: Props<OptionType, IsMulti> & { isMulti?: IsMulti },
  ref: React.Ref<SelectInstance<OptionType, IsMulti, GroupBase<OptionType>>>
) => {
  const {
    styles = defaultStyles,
    classNames = defaultClassNames,
    components = {},
    ...rest
  } = props
  const instanceId = React.useId()

  return (
    <SelectComponent<OptionType, IsMulti, GroupBase<OptionType>>
      ref={ref}
      instanceId={instanceId}
      unstyled
      filterOption={createFilter({
        matchFrom: 'any',
        stringify: option => option.label
      })}
      components={{
        DropdownIndicator,
        ClearIndicator,
        MultiValueRemove,
        Option,
        Menu,
        MenuList,
        ...components
      }}
      styles={styles}
      classNames={classNames}
      {...rest}
    />
  )
}

export default React.forwardRef(BaseSelect) as <
  IsMulti extends boolean = false
>(
  p: Props<OptionType, IsMulti> & {
    ref?: React.RefAttributes<
      SelectInstance<OptionType, IsMulti, GroupBase<OptionType>>
    >['ref']

    isMulti?: IsMulti
  }
) => ReactElement
