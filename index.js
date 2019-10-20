String.prototype.clr = function(hex_color) { return `<font color='#${hex_color}'>${this}</font>`; };

const SettingsUI = require('tera-mod-ui').Settings;

module.exports = function Lazy_Steroids(mod) {

    let command = mod.command;
    let config = mod.settings;
    let player = mod.game.me;

    mod.game.initialize('inventory');

    const not_usable_brooch = [19698, 19701, 19704, 19734, 19735, 80280, 80281];
    const usable_beer = [80081, 206045, 206770];

    let in_dungeon = false;

    let brooch_cooldown = 0;
    let rootbeer_cooldown = 0;

    command.add('lazy', (arg_1) => {
        if (!arg_1) {
            config.enabled = !config.enabled;
            command.message(`${config.enabled ? '[Settings] The module is now enabled.'.clr('00ff04') : '[Settings] The module is now disabled.'.clr('ff1d00')}`);
        }
        else if (arg_1 === 'world') {
            config.open_world = !config.open_world;
            command.message(`${config.open_world ? '[Settings] Open world usage is now enabled.'.clr('00ff04') : '[Settings] Open world usage is now disabled.'.clr('ff1d00')}`);
        }
        else if (arg_1 === 'notify') {
            config.notification = !config.notification;
            command.message(`${config.notification ? '[Settings] Rootbeer counter is now enabled.'.clr('00ff04') : '[Settings] Rootbeer counter is now disabled.'.clr('ff1d00')}`);
        }
        else if (arg_1 === 'debug') {
            config.debug_mode = !config.debug_mode;
            command.message(`${config.debug_mode ? '[Settings] Debugging of skill and zone id\'s is now enabled.'.clr('00ff04') : '[Settings] Debugging of skill and zone id\'s is now disabled.'.clr('ff1d00')}`);
        }
        else if (arg_1 === 'config') {
            if (ui) {
                ui.show();
            }
        }
    });

    mod.game.on('enter_game', () => {
        check_config_file();
        config.use_brooch_on = config.skills[player.class].use_brooch_on;
        config.use_rootbeer_on = config.skills[player.class].use_rootbeer_on;
        config.use_out_of_combat = config.skills[player.class].use_out_of_combat;
        config.trigger_delay = config.skills[player.class].trigger_delay;
    });

    mod.game.me.on('change_zone', (zone) => {
        if (!config.dungeon_blacklist.includes(zone) && player.inDungeon) {
            in_dungeon = true;
        } else {
            in_dungeon = false;
        }
        if (config.debug_mode) {
            command.message(`[Info] Zone id ${zone} found. For further instructions read the readme.`.clr('ffff00'));
        }
    });

    mod.hook('C_START_SKILL', 7, { order: Number.NEGATIVE_INFINITY }, (event) => {
        if (config.enabled) {
            handle(event);
        }
        if (config.debug_mode) {
            command.message(`[Info] Skill id ${event.skill.id} found. For further instructions read the readme.`.clr('ffff00'));
        }
    });

    mod.hook('S_START_COOLTIME_ITEM', 1, { order: Number.NEGATIVE_INFINITY }, (event) => {
        const brooch_info = mod.game.inventory.equipment.slots[20];
        if (brooch_info && event.item === brooch_info.id) {
            brooch_cooldown = Date.now() + event.cooldown * 1000;
        }
        if (usable_beer.includes(event.item)) {
            rootbeer_cooldown = Date.now() + event.cooldown * 1000;
        }
    });

    mod.game.on('leave_game', () => {
        config.debug_mode = false;
    });

    function handle(info) {
        if ((!config.use_out_of_combat && !player.inCombat) || player.inBattleground || (!in_dungeon && !config.open_world)) return;
        if (config.use_brooch_on.includes(info.skill.id) && Date.now() > brooch_cooldown) {
            const brooch_info = mod.game.inventory.equipment.slots[20];
            if (brooch_info) {
                mod.setTimeout(use_item, config.trigger_delay, brooch_info, info.loc, info.w);
            }
            else if (config.notification && !brooch_info) {
                command.message('[Warning] The module can not find any brooch to use.'.clr('ff00ff'));
            }
        }
        if (config.use_rootbeer_on.includes(info.skill.id) && Date.now() > rootbeer_cooldown) {
            const rootbeer_info = mod.game.inventory.findInBagOrPockets(usable_beer);
            if (rootbeer_info) {
                mod.setTimeout(use_item, config.trigger_delay, rootbeer_info, info.loc, info.w);
            }
            else if (config.notification && !rootbeer_info) {
                command.message('[Warning] The module can not find any rootbeer to use.'.clr('ff00ff'));
            }
        }
    }

    function use_item(item_info, loc_info, angle_info) {
        if (not_usable_brooch.includes(item_info.id)) return;
        mod.send('C_USE_ITEM', 3, {
            gameId: player.gameId,
            id: item_info.id,
            amount: 1,
            loc: loc_info,
            w: angle_info,
            unk4: true
        });
        if (config.notification && usable_beer.includes(item_info.id)) {
            command.message(`[Info] You got ${item_info.amount - 1}x${item_info.data.name} left in your inventory.`.clr('ffff00'));
        }
    }

    function check_config_file() {
        if (!Array.isArray(config.skills[player.class].use_brooch_on)) {
            config.skills[player.class].use_brooch_on = [];
            mod.error('Invalid brooch skill settings detected default settings will be applied.');
        }
        if (!Array.isArray(config.skills[player.class].use_rootbeer_on)) {
            config.skills[player.class].use_rootbeer_on = [];
            mod.error('Invalid rootbeer skill settings detected default settings will be applied.');
        }
        if (!Array.isArray(config.dungeon_blacklist)) {
            config.dungeon_blacklist = [];
            mod.error('Invalid dungeon blacklist settings detected default settings will be applied.');
        }
    }

    let ui = null;

    if (global.TeraProxy.GUIMode) {
        ui = new SettingsUI(mod, require('./settings_structure'), config, {
            alwaysOnTop: true,
            width: 1000,
            height: 415
        });
        ui.on('update', settings => {
            if (typeof config.use_brooch_on === 'string') {
                config.skills[player.class].use_brooch_on = config.use_brooch_on = config.use_brooch_on.split(/\s*(?:,|$)\s*/).map(Number);
            }
            if (typeof config.use_rootbeer_on === 'string') {
                config.skills[player.class].use_rootbeer_on = config.use_rootbeer_on = config.use_rootbeer_on.split(/\s*(?:,|$)\s*/).map(Number);
            }
            config.skills[player.class].use_out_of_combat = config.use_out_of_combat;
            config.skills[player.class].trigger_delay = config.trigger_delay;
            if (typeof config.dungeon_blacklist === 'string') {
                config.dungeon_blacklist = config.dungeon_blacklist.split(/\s*(?:,|$)\s*/).map(Number);
            }
            config = settings;
        });
        this.destructor = () => {
            if (ui) {
                ui.close();
                ui = null;
            }
        };
    }
};