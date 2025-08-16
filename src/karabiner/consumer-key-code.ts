// See https://github.com/pqrs-org/Karabiner-Elements/blob/main/src/apps/SettingsWindow/Resources/simple_modifications.json

export let fromAndToConsumerKeyCodes = [
  // Media controls
  'rewind',
  'play_or_pause',
  'fast_forward',
  'mute',
  'volume_decrement',
  'volume_increment',
  'al_terminal_lock_or_screensaver', // Lock key on Magic Keyboard without Touch ID
  'eject',
  'scan_previous_track',
  'scan_next_track',
  // Application Launch keys
  'al_word_processor',
  'al_text_editor',
  'al_spreadsheet',
  'al_presentation_app',
  'al_email_reader',
  'al_calculator',
  'al_local_machine_browser',
  'al_internet_browser',
  'al_dictionary',
  // Others
  'fastforward',
] as const

export let fromOnlyConsumerKeyCodes = [
  // Media controls
  'menu', // Touch ID on Magic Keyboard
  // Application Launch keys
  'al_graphics_editor',
  'al_database_app',
  'al_newsreader',
  'al_voicemail',
  'al_contacts_or_address_book',
  'al_Calendar_Or_Schedule',
  'al_task_or_project_manager',
  'al_log_or_journal_or_timecard',
  'al_checkbook_or_finance',
  'al_a_or_v_capture_or_playback',
  'al_lan_or_wan_browser',
  'al_remote_networking_or_isp_connect',
  'al_network_conference',
  'al_network_chat',
  'al_telephony_or_dialer',
  'al_logon',
  'al_logoff',
  'al_logon_or_logoff',
  'al_control_panel',
  'al_command_line_processor_or_run',
  'al_process_or_task_manager',
  'al_select_task_or_application',
  'al_next_task_or_application',
  'al_previous_task_or_application',
  'al_preemptive_halt_task_or_application',
  'al_integrated_help_center',
  'al_documents',
  'al_thesaurus',
  'al_desktop',
  'al_spell_check',
  'al_grammer_check',
  'al_wireless_status',
  'al_keyboard_layout',
  'al_virus_protection',
  'al_encryption',
  'al_screen_saver',
  'al_alarms',
  'al_clock',
  'al_file_browser',
  'al_power_status',
  'al_image_browser',
  'al_audio_browser',
  'al_movie_browser',
  'al_digital_rights_manager',
  'al_digital_wallet',
  'al_instant_messaging',
  'al_oem_feature_browser',
  'al_oem_help',
  'al_online_community',
  'al_entertainment_content_browser',
  'al_online_shopping_browswer',
  'al_smart_card_information_or_help',
  'al_market_monitor_or_finance_browser',
  'al_customized_corporate_news_browser',
  'al_online_activity_browswer',
  'al_research_or_search_browswer',
  'al_audio_player',
  'al_message_status',
  'al_contact_sync',
  'al_navigation',
  'al_contextaware_desktop_assistant',
  // Generic GUI application Control keys
  'ac_home',
  'ac_back',
  'ac_forward',
  'ac_refresh',
  'ac_bookmarks',
  // Remote control buttons
  'menu_pick',
  'menu_up',
  'menu_down',
  'menu_left',
  'menu_right',
  'menu_escape',
  'menu_value_increase',
  'menu_value_decrease',
  'data_on_screen',
  'closed_caption',
  'closed_caption_select',
  'vcr_or_tv',
  'broadcast_mode',
  'snapshot',
  'still',
  'picture_in_picture_toggle',
  'picture_in_picture_swap',
  'red_menu_button',
  'green_menu_button',
  'blue_menu_button',
  'yellow_menu_button',
  'aspect',
  'three_dimensional_mode_select',
] as const

export let toOnlyConsumerKeyCodes = [
  // Media controls
  'display_brightness_decrement',
  'display_brightness_increment',
  'dictation',
] as const

export type FromAndToConsumerKeyCode =
  (typeof fromAndToConsumerKeyCodes)[number]
export type FromOnlyConsumerKeyCode = (typeof fromOnlyConsumerKeyCodes)[number]
export type ToOnlyConsumerKeyCode = (typeof toOnlyConsumerKeyCodes)[number]

export type ConsumerKeyCode =
  | FromAndToConsumerKeyCode
  | FromOnlyConsumerKeyCode
  | ToOnlyConsumerKeyCode
export type FromConsumerKeyCode =
  | FromAndToConsumerKeyCode
  | FromOnlyConsumerKeyCode
export type ToConsumerKeyCode = FromAndToConsumerKeyCode | ToOnlyConsumerKeyCode
