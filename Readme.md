### Tera toolbox module which is using brooch and or rootbeer after the desired trigger skills.

---

### Console Commands
| Command | Description | Status |
| :---: | :---: | :---: |
| `/8 lazy` | To automatically use brooch and or rootbeer after the desired trigger skills. | Enabled by default. |
| `/8 lazy world` | To switch between the open world mode and the in dungeon usage mode. | Enabled by default. |
| `/8 lazy notify` | To receive a private notification with your current rootbeer amount after using it. | Disabled by default. |
| `/8 lazy debug` | To show skill and zone id's after skill usage or teleport in your toolbox chat. | Disabled by default. |

- If you got notifications enabled you'll also receive warnings if the module can't find any brooch and or rootbeer to use.

---

### Interface Commands
| Command | Description |
| :---: | :---: |
| `/8 lazy config` | To enable or disable the functions written above and edit your current class configuration. |

---

### Configuration
- If you want to edit the config file you need to start tera toolbox and go to the server selection.
    - It will be generated afterwards in the modules folder.

---

- An list of things that can be edited can be found here. Only for experienced users.

| Name | Description |
| :---: | :---: |
| `skills[class].use_brooch_on` | Here you can add or remove skill id's which should trigger automatic brooch usage. |
| `skills[class].use_rootbeer_on` | Here you can add or remove skill id's which should trigger automatic rootbeer usage. |
| `skills[class].use_out_of_combat` | Here you can switch between the in combat mode and the out of combat usage mode. |
| `skills[class].trigger_delay` | Here you can set the desired brooch and or rootbeer usage trigger delay. |
| `dungeon_blacklist` | Here you can add or remove dungeon zone id's to the dungeon blacklist. |

- Don't edit the class settings without the class name. Those are fake settings used by the user interface only.

---

### Dungeon Information
- Debug command listed above.
- [Tera Damage Meter Data => Dungeons](https://github.com/neowutran/TeraDpsMeterData/tree/master/dungeons)


### Skill Information
- Debug command listed above.
- [Tera Damage Meter Data => Skills](https://github.com/neowutran/TeraDpsMeterData/tree/master/skills)

---

### Note
- An list of the blacklisted dungeons which are currently added in the config file can be found here [Dungeon Overview](https://github.com/Tera-Shiraneko/lazy-steroids/tree/master/Additional-Data/Dungeon-Information).
- An list of the trigger skills which are currently added in the config file can be found here [Skill Overview](https://github.com/Tera-Shiraneko/lazy-steroids/tree/master/Additional-Data/Skill-Information).
- In case of multiple skill id's in your class configuration brooch and or rootbeer will be used on the first trigger skill.
- In case of multiple skill id's in the config file or settings interface you need to seperate them with a comma.
- If you unlock an skill option for an already added skill it's possible that the skill id will change.