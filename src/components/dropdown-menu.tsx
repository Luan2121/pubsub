import React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { violet, mauve } from '@radix-ui/colors';
import styled from '@emotion/styled';

const StyledContent = styled(DropdownMenuPrimitive.Content)`
  min-width: 220;
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2);
  @media (prefers-reduced-motion: no-preference) {
    animation-duration: 400ms;
    animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
    willChange: transform, opacity;
    &[data-state="open"] {
      &[data-side="top"] { animation-name: slideDownAndFade; }
      &[data-side="right"]: { animation-name: slideLeftAndFade; }
      &[data-side="bottom"]: { animation-name: slideUpAndFade; }
      &[data-side="left"]: { animation-name: slideRightAndFade; }
    }
  }
` 

const itemStyles = {
  all: 'unset',
  fontSize: 13,
  lineHeight: 1,
  color: '#000',
  borderRadius: 3,
  display: 'flex',
  alignItems: 'center',
  height: 25,
  padding: '0 5px',
  position: 'relative',
  paddingLeft: 25,
  userSelect: 'none',

  '&[data-disabled]': {
    color: mauve.mauve8,
    pointerEvents: 'none',
  },

  '&:focus': {
    backgroundColor: violet.violet9,
    color: violet.violet1,
  },
};

const StyledItem = styled(DropdownMenuPrimitive.Item)`

`;

const StyledCheckboxItem = styled(DropdownMenuPrimitive.CheckboxItem)`

`;
const StyledRadioItem = styled(DropdownMenuPrimitive.RadioItem)`

`;

const StyledTriggerItem = styled(DropdownMenuPrimitive.TriggerItem)`

`;

const StyledLabel = styled(DropdownMenuPrimitive.Label)`
  padding-Left: 16px;
  font-size: 12px,
  line-height: 25px;
  color: ${mauve.mauve11};
`;

const StyledSeparator = styled(DropdownMenuPrimitive.Separator)`
  height: 1px;
  backgroundColor: ${violet.violet6};
  margin: 8px;
`;

const StyledItemIndicator = styled(DropdownMenuPrimitive.ItemIndicator)`
  position: absolute;
  left: 0;
  width: 25px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const StyledArrow = styled(DropdownMenuPrimitive.Arrow)`
  fill: white;
`;

// Exports
export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuContent = StyledContent;
export const DropdownMenuItem = StyledItem;
export const DropdownMenuCheckboxItem = StyledCheckboxItem;
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;
export const DropdownMenuRadioItem = StyledRadioItem;
export const DropdownMenuItemIndicator = StyledItemIndicator;
export const DropdownMenuTriggerItem = StyledTriggerItem;
export const DropdownMenuLabel = StyledLabel;
export const DropdownMenuSeparator = StyledSeparator;
export const DropdownMenuArrow = StyledArrow;