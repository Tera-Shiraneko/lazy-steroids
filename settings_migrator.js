const fs = require("fs");

const Default_Settings = {
    "enabled": true,
    "world": true,
    "notify": false,
    "debug": false,
    "use_brooch_on": [],
    "use_rootbeer_on": [],
    "use_out_of_combat": false,
    "delay": 0,
    "skills": {
        "warrior": {
            "use_brooch_on": [
                350100,
                200200
            ],
            "use_rootbeer_on": [
                350100,
                200200
            ],
            "use_out_of_combat": true,
            "delay": 0
        },
        "lancer": {
            "use_brooch_on": [
                120100,
                170200,
                70300
            ],
            "use_rootbeer_on": [
                120100,
                170200,
                70300
            ],
            "use_out_of_combat": true,
            "delay": 0
        },
        "slayer": {
            "use_brooch_on": [
                200300
            ],
            "use_rootbeer_on": [
                200300
            ],
            "use_out_of_combat": true,
            "delay": 0
        },
        "berserker": {
            "use_brooch_on": [
                330100
            ],
            "use_rootbeer_on": [
                330100
            ],
            "use_out_of_combat": true,
            "delay": 0
        },
        "sorcerer": {
            "use_brooch_on": [
                340200,
                340230
            ],
            "use_rootbeer_on": [
                340200,
                340230
            ],
            "use_out_of_combat": true,
            "delay": 0
        },
        "archer": {
            "use_brooch_on": [
                350100
            ],
            "use_rootbeer_on": [
                350100
            ],
            "use_out_of_combat": true,
            "delay": 0
        },
        "priest": {
            "use_brooch_on": [
                430100
            ],
            "use_rootbeer_on": [
                430100
            ],
            "use_out_of_combat": true,
            "delay": 0
        },
        "elementalist": {
            "use_brooch_on": [
                480100
            ],
            "use_rootbeer_on": [
                480100
            ],
            "use_out_of_combat": true,
            "delay": 0
        },
        "soulless": {
            "use_brooch_on": [
                160100
            ],
            "use_rootbeer_on": [
                160100
            ],
            "use_out_of_combat": true,
            "delay": 0
        },
        "engineer": {
            "use_brooch_on": [
                410101
            ],
            "use_rootbeer_on": [
                410101
            ],
            "use_out_of_combat": true,
            "delay": 0
        },
        "fighter": {
            "use_brooch_on": [
                140101,
                260100
            ],
            "use_rootbeer_on": [
                140101,
                260100
            ],
            "use_out_of_combat": true,
            "delay": 0
        },
        "assassin": {
            "use_brooch_on": [
                230100
            ],
            "use_rootbeer_on": [
                230100
            ],
            "use_out_of_combat": true,
            "delay": 0
        },
        "glaiver": {
            "use_brooch_on": [
                120100,
                250100
            ],
            "use_rootbeer_on": [
                120100,
                250100
            ],
            "use_out_of_combat": true,
            "delay": 0
        }
    },
    "dungeon_blacklist": [
        3016,
        9031,
        9032,
        9069,
        9713,
        9808,
        9809
    ]
};

module.exports = function Migrate_Settings(from_ver, to_ver, settings) {
    if (from_ver === undefined) {
        return Object.assign(Object.assign({}, Default_Settings), settings);
    }
    else if (from_ver === null) {
        return Default_Settings;
    }
    else if (from_ver + 0.1 < to_ver) {
        settings = Migrate_Settings(from_ver, from_ver + 0.1, settings);
        return Migrate_Settings(from_ver + 0.1, to_ver, settings);
    }
    switch (to_ver) {
        case 1.5:
            fs.unlinkSync(__dirname + "/config.json");
            break;
    }
    return Default_Settings;
};