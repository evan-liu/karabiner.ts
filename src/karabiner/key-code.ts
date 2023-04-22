export type StickyModifierKeyCode =
  | 'left_control'
  | 'left_shift'
  | 'left_option'
  | 'left_command'
  | 'right_control'
  | 'right_shift'
  | 'right_option'
  | 'right_command'
  | 'fn'

export type ModifierKeyCode = StickyModifierKeyCode | 'caps_lock'

export type ControlOrSymbolKeyCode =
  | 'return_or_enter'
  | 'escape'
  | 'delete_or_backspace'
  | 'delete_forward'
  | 'tab'
  | 'spacebar'
  | 'hyphen'
  | 'equal_sign'
  | 'open_bracket'
  | 'close_bracket'
  | 'backslash'
  | 'non_us_pound'
  | 'semicolon'
  | 'quote'
  | 'grave_accent_and_tilde'
  | 'comma'
  | 'period'
  | 'slash'
  | 'non_us_backslash'

export type ArrowKeyCode =
  | 'up_arrow'
  | 'down_arrow'
  | 'left_arrow'
  | 'right_arrow'
  | 'page_up'
  | 'page_down'
  | 'home'
  | 'end'

export type LetterKeyCode =
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'h'
  | 'i'
  | 'j'
  | 'k'
  | 'l'
  | 'm'
  | 'n'
  | 'o'
  | 'p'
  | 'q'
  | 'r'
  | 's'
  | 't'
  | 'u'
  | 'v'
  | 'w'
  | 'x'
  | 'y'
  | 'z'

export type NumberKeyCode =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '0'

export type FunctionKeyCode =
  | 'f1'
  | 'f2'
  | 'f3'
  | 'f4'
  | 'f5'
  | 'f6'
  | 'f7'
  | 'f8'
  | 'f9'
  | 'f10'
  | 'f11'
  | 'f12'
  | 'f13'
  | 'f14'
  | 'f15'
  | 'f16'
  | 'f17'
  | 'f18'
  | 'f19'
  | 'f20'

export type FromOnlyFunctionKeyCode = 'f21' | 'f22' | 'f23' | 'f24'

export type KeypadKeyCode =
  | 'keypad_num_lock'
  | 'keypad_slash'
  | 'keypad_asterisk'
  | 'keypad_hyphen'
  | 'keypad_plus'
  | 'keypad_enter'
  | 'keypad_1'
  | 'keypad_2'
  | 'keypad_3'
  | 'keypad_4'
  | 'keypad_5'
  | 'keypad_6'
  | 'keypad_7'
  | 'keypad_8'
  | 'keypad_9'
  | 'keypad_0'
  | 'keypad_period'
  | 'keypad_equal_sign'
  | 'keypad_comma'

export type ToDisableKeyCode = 'vk_none'

export type KeyCode =
  | ModifierKeyCode
  | ControlOrSymbolKeyCode
  | ArrowKeyCode
  | LetterKeyCode
  | NumberKeyCode
  | FunctionKeyCode
  | FromOnlyFunctionKeyCode
  | KeypadKeyCode
  | ToDisableKeyCode

export type FromKeyCode = Exclude<KeyCode, ToDisableKeyCode>
export type ToKeyCode = Exclude<KeyCode, FromOnlyFunctionKeyCode>
