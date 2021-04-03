// balance.test.js

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Balance from '../components/Balance';

let container = null;

beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});
  
afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("should render balance", () => {
    const dataBalance = [
        [
            "XXLM",
            "XLMEUR",
            "50.00000000",
            "0.37241100"
        ],
        [
            "BCH",
            "BCHEUR",
            "0.1603501800",
            "500.920000"
        ]
    ]

    const dataTradesHistory = {
        "trades": {
            "T6XZZ6-STPZS-HEPXCR": {
                "ordertxid": "ORJH2D-IPATW-Y2KCTX",
                "postxid": "TKH2SE-M7IF5-CFI7LT",
                "pair": "BCHEUR",
                "time": 1614070772.6132,
                "type": "buy",
                "ordertype": "limit",
                "price": "401.000000",
                "cost": "21.830700",
                "fee": "0.034929",
                "vol": "0.05444065",
                "margin": "0.000000",
                "misc": ""
            },
            "T4EEEH-KXTGS-EJ32E4": {
                "ordertxid": "O53ZHN-EMBEI-CYZFKM",
                "postxid": "TKH2SE-M7IF5-CFI7LT",
                "pair": "XXLMZEUR",
                "time": 1613584255.5538,
                "type": "buy",
                "ordertype": "limit",
                "price": "0.41300000",
                "cost": "20.65000000",
                "fee": "0.03304000",
                "vol": "50.00000000",
                "margin": "0.00000000",
                "misc": ""
            },
            "TYPR5G-HWMKY-VN52KT": {
                "ordertxid": "OB6C3E-WN56E-HMLHSE",
                "postxid": "TKH2SE-M7IF5-CFI7LT",
                "pair": "XDGEUR",
                "time": 1613583612.732,
                "type": "sell",
                "ordertype": "limit",
                "price": "0.043106900",
                "cost": "42.659504029",
                "fee": "0.110914711",
                "vol": "989.62124461",
                "margin": "0.000000000",
                "misc": ""
            },
            "T54AXK-MAJG2-7EUAC6": {
                "ordertxid": "OT45OS-RBM52-4QFRQL",
                "postxid": "TKH2SE-M7IF5-CFI7LT",
                "pair": "BCHEUR",
                "time": 1613478535.6285,
                "type": "buy",
                "ordertype": "limit",
                "price": "594.000000",
                "cost": "62.910300",
                "fee": "0.100656",
                "vol": "0.10590960",
                "margin": "0.000000",
                "misc": ""
            },
            "TELE62-TKTBG-UWKTIW": {
                "ordertxid": "OZEC5V-DMVLI-QXP4XJ",
                "postxid": "TKH2SE-M7IF5-CFI7LT",
                "pair": "XXBTZEUR",
                "time": 1612788955.3049,
                "type": "sell",
                "ordertype": "limit",
                "price": "35000.00000",
                "cost": "0.10080",
                "fee": "0.00016",
                "vol": "0.00000288",
                "margin": "0.00000",
                "misc": ""
            },
            "TRDWGM-RUSIY-S7J5VO": {
                "ordertxid": "OZEC5V-DMVLI-QXP4XJ",
                "postxid": "TKH2SE-M7IF5-CFI7LT",
                "pair": "XXBTZEUR",
                "time": 1612788955.3033,
                "type": "sell",
                "ordertype": "limit",
                "price": "35000.00000",
                "cost": "63.01120",
                "fee": "0.10082",
                "vol": "0.00180032",
                "margin": "0.00000",
                "misc": ""
            },
            "TECQ4P-FSCBB-E6W5JG": {
                "ordertxid": "OFII7J-ZREM4-AQBXQM",
                "postxid": "TKH2SE-M7IF5-CFI7LT",
                "pair": "XDGEUR",
                "time": 1612735876.4784,
                "type": "buy",
                "ordertype": "limit",
                "price": "0.066000000",
                "cost": "58.671600000",
                "fee": "0.152546160",
                "vol": "888.96363636",
                "margin": "0.000000000",
                "misc": ""
            },
            "TVNY6H-WIZEA-ZMS2F3": {
                "ordertxid": "OYS4WB-MXO7G-5LMOIN",
                "postxid": "TKH2SE-M7IF5-CFI7LT",
                "pair": "XDGEUR",
                "time": 1612735527.9107,
                "type": "buy",
                "ordertype": "limit",
                "price": "0.065436500",
                "cost": "6.586727351",
                "fee": "0.017125491",
                "vol": "100.65830769",
                "margin": "0.000000000",
                "misc": ""
            },
            "TJLQD7-47T7Q-QPWGFY": {
                "ordertxid": "OAEUPD-O6NX3-ZZQL3G",
                "postxid": "TKH2SE-M7IF5-CFI7LT",
                "pair": "XXBTZEUR",
                "time": 1612735466.4863,
                "type": "sell",
                "ordertype": "limit",
                "price": "32000.00000",
                "cost": "65.53280",
                "fee": "0.10485",
                "vol": "0.00204790",
                "margin": "0.00000",
                "misc": ""
            },
            "TBTUMN-44GF2-XMT6BH": {
                "ordertxid": "OHMPWE-PZCMP-YQEVMY",
                "postxid": "TKH2SE-M7IF5-CFI7LT",
                "pair": "XXBTZEUR",
                "time": 1610309246.1105,
                "type": "buy",
                "ordertype": "limit",
                "price": "30000.00000",
                "cost": "54.09600",
                "fee": "0.08655",
                "vol": "0.00180320",
                "margin": "0.00000",
                "misc": ""
            },
            "TF233G-JMCGN-7D4CEW": {
                "ordertxid": "OWVI5M-CN2QF-H7ZGZC",
                "postxid": "TKH2SE-M7IF5-CFI7LT",
                "pair": "XXBTZEUR",
                "time": 1609863592.847,
                "type": "sell",
                "ordertype": "limit",
                "price": "26500.00000",
                "cost": "54.26935",
                "fee": "0.08683",
                "vol": "0.00204790",
                "margin": "0.00000",
                "misc": ""
            },
            "TVUT4A-EN2Y6-BUABYK": {
                "ordertxid": "OVJNDD-C3Z56-LHCEC2",
                "postxid": "TKH2SE-M7IF5-CFI7LT",
                "pair": "XXBTZEUR",
                "time": 1609687809.8866,
                "type": "buy",
                "ordertype": "limit",
                "price": "25750.00000",
                "cost": "27.25050",
                "fee": "0.04360",
                "vol": "0.00105827",
                "margin": "0.00000",
                "misc": ""
            },
            "T4ZS4B-J55XK-VPY6F7": {
                "ordertxid": "OLWTCS-AF455-OED75D",
                "postxid": "TKH2SE-M7IF5-CFI7LT",
                "pair": "XXBTZEUR",
                "time": 1609670783.6083,
                "type": "sell",
                "ordertype": "limit",
                "price": "27000.00000",
                "cost": "27.33777",
                "fee": "0.04374",
                "vol": "0.00101251",
                "margin": "0.00000",
                "misc": ""
            },
            "TXNHVZ-P6DWV-DMSLNW": {
                "ordertxid": "OLAP42-T443D-BEUY6A",
                "postxid": "TKH2SE-M7IF5-CFI7LT",
                "pair": "XXBTZEUR",
                "time": 1609619938.9736,
                "type": "buy",
                "ordertype": "limit",
                "price": "24500.00000",
                "cost": "49.60160",
                "fee": "0.07936",
                "vol": "0.00202456",
                "margin": "0.00000",
                "misc": ""
            },
            "TTYQE7-DZQ4F-AFBC72": {
                "ordertxid": "OGFBXL-3MS7G-67GXM2",
                "postxid": "TKH2SE-M7IF5-CFI7LT",
                "pair": "XXBTZEUR",
                "time": 1609591447.5004,
                "type": "sell",
                "ordertype": "limit",
                "price": "24800.00000",
                "cost": "25.01055",
                "fee": "0.04002",
                "vol": "0.00100849",
                "margin": "0.00000",
                "misc": ""
            },
            "TK3WDF-7GAUT-VDB5MY": {
                "ordertxid": "OZMN3Y-MQDWO-VNIEE4",
                "postxid": "TKH2SE-M7IF5-CFI7LT",
                "pair": "XXBTZEUR",
                "time": 1609591382.5177,
                "type": "sell",
                "ordertype": "limit",
                "price": "24750.00000",
                "cost": "24.75000",
                "fee": "0.03960",
                "vol": "0.00100000",
                "margin": "0.00000",
                "misc": ""
            },
            "TQWSPW-UEQQV-FDCXXS": {
                "ordertxid": "ODWLWT-2UGAN-R4WKFR",
                "postxid": "TKH2SE-M7IF5-CFI7LT",
                "pair": "XXBTZEUR",
                "time": 1609420151.8844,
                "type": "buy",
                "ordertype": "limit",
                "price": "23000.00000",
                "cost": "23.51520",
                "fee": "0.03762",
                "vol": "0.00102240",
                "margin": "0.00000",
                "misc": ""
            },
            "TBZ2H3-6VSY3-TEPFGL": {
                "ordertxid": "OVFC4G-6ELSO-2U3ZFA",
                "postxid": "TKH2SE-M7IF5-CFI7LT",
                "pair": "XXBTZEUR",
                "time": 1609361245.9845,
                "type": "sell",
                "ordertype": "limit",
                "price": "23500.00000",
                "cost": "23.59048",
                "fee": "0.03774",
                "vol": "0.00100385",
                "margin": "0.00000",
                "misc": ""
            },
            "TDX2B6-7GYJT-KWGTRO": {
                "ordertxid": "OYR7IW-PVLUG-HOHBKY",
                "postxid": "TKH2SE-M7IF5-CFI7LT",
                "pair": "XXBTZEUR",
                "time": 1609091356.6698,
                "type": "buy",
                "ordertype": "limit",
                "price": "21550.00000",
                "cost": "22.00960",
                "fee": "0.03522",
                "vol": "0.00102133",
                "margin": "0.00000",
                "misc": ""
            },
            "TJZYFX-CJXCK-NEZMS4": {
                "ordertxid": "OCF75J-LVDVV-AQD2OP",
                "postxid": "TKH2SE-M7IF5-CFI7LT",
                "pair": "XXBTZEUR",
                "time": 1609069182.774,
                "type": "buy",
                "ordertype": "limit",
                "price": "22500.00000",
                "cost": "22.50000",
                "fee": "0.03600",
                "vol": "0.00100000",
                "margin": "0.00000",
                "misc": ""
            },
            "T6OHNL-KCGLU-4C3UPS": {
                "ordertxid": "OMCRXO-W4AME-4FNN2U",
                "postxid": "TKH2SE-M7IF5-CFI7LT",
                "pair": "XXBTZEUR",
                "time": 1609004941.3283,
                "type": "sell",
                "ordertype": "limit",
                "price": "21054.89152",
                "cost": "22.77655",
                "fee": "0.05922",
                "vol": "0.00108177",
                "margin": "0.00000",
                "misc": ""
            },
            "TAREXK-7FGHK-KXGTSS": {
                "ordertxid": "ONOCT5-TGYCP-BDZMEJ",
                "postxid": "TKH2SE-M7IF5-CFI7LT",
                "pair": "XXBTZEUR",
                "time": 1608895822.5393,
                "type": "sell",
                "ordertype": "limit",
                "price": "19950.00000",
                "cost": "21.58111",
                "fee": "0.03453",
                "vol": "0.00108176",
                "margin": "0.00000",
                "misc": ""
            },
            "TG5HIQ-FODA4-ERH2VT": {
                "ordertxid": "OMDABG-7L2UU-6KTYW3",
                "postxid": "TKH2SE-M7IF5-CFI7LT",
                "pair": "XXBTZEUR",
                "time": 1608498460.5448,
                "type": "buy",
                "ordertype": "limit",
                "price": "19599.00000",
                "cost": "20.69537",
                "fee": "0.05381",
                "vol": "0.00105594",
                "margin": "0.00000",
                "misc": ""
            },
            "TXXCUU-IRK7Z-QIMNRN": {
                "ordertxid": "OVKCX6-5BGAV-B2DVSX",
                "postxid": "TKH2SE-M7IF5-CFI7LT",
                "pair": "XXBTZEUR",
                "time": 1608423611.9142,
                "type": "buy",
                "ordertype": "limit",
                "price": "19050.00000",
                "cost": "21.09959",
                "fee": "0.03376",
                "vol": "0.00110759",
                "margin": "0.00000",
                "misc": ""
            },
            "T7G7Q6-JSG7X-PSRUX2": {
                "ordertxid": "OHO5PH-N2ZNK-CNS6Q5",
                "postxid": "TKH2SE-M7IF5-CFI7LT",
                "pair": "XXBTZEUR",
                "time": 1608235223.0612,
                "type": "sell",
                "ordertype": "limit",
                "price": "18700.00000",
                "cost": "0.00019",
                "fee": "0.00000",
                "vol": "0.00000001",
                "margin": "0.00000",
                "misc": ""
            },
            "TKO6LZ-ZLXNJ-5TTN4T": {
                "ordertxid": "OHO5PH-N2ZNK-CNS6Q5",
                "postxid": "TKH2SE-M7IF5-CFI7LT",
                "pair": "XXBTZEUR",
                "time": 1608235223.0599,
                "type": "sell",
                "ordertype": "limit",
                "price": "18700.00000",
                "cost": "0.06040",
                "fee": "0.00010",
                "vol": "0.00000323",
                "margin": "0.00000",
                "misc": ""
            },
            "TAA7IC-Q4FZE-XTHTQP": {
                "ordertxid": "OHO5PH-N2ZNK-CNS6Q5",
                "postxid": "TKH2SE-M7IF5-CFI7LT",
                "pair": "XXBTZEUR",
                "time": 1608235223.058,
                "type": "sell",
                "ordertype": "limit",
                "price": "18700.00000",
                "cost": "37.87816",
                "fee": "0.06061",
                "vol": "0.00202557",
                "margin": "0.00000",
                "misc": ""
            },
            "TDQW7B-KYKOH-OBXFP7": {
                "ordertxid": "OHO5PH-N2ZNK-CNS6Q5",
                "postxid": "TKH2SE-M7IF5-CFI7LT",
                "pair": "XXBTZEUR",
                "time": 1608235215.6005,
                "type": "sell",
                "ordertype": "limit",
                "price": "18700.00000",
                "cost": "4.22732",
                "fee": "0.00676",
                "vol": "0.00022606",
                "margin": "0.00000",
                "misc": ""
            },
            "TH5IAN-FZFSH-OW7JNP": {
                "ordertxid": "ORGHXF-NZUOU-2XTDLG",
                "postxid": "TKH2SE-M7IF5-CFI7LT",
                "pair": "XXBTZEUR",
                "time": 1608227198.7958,
                "type": "buy",
                "ordertype": "limit",
                "price": "19157.20000",
                "cost": "20.73824",
                "fee": "0.05392",
                "vol": "0.00108253",
                "margin": "0.00000",
                "misc": ""
            },
            "TUDGPS-HQ23X-FPB6XJ": {
                "ordertxid": "OPISCM-S36XB-YPXYNL",
                "postxid": "TKH2SE-M7IF5-CFI7LT",
                "pair": "XXBTZEUR",
                "time": 1608197983.5691,
                "type": "buy",
                "ordertype": "limit",
                "price": "17850.00000",
                "cost": "20.92627",
                "fee": "0.03348",
                "vol": "0.00117234",
                "margin": "0.00000",
                "misc": ""
            },
            "TLCOI6-BLQJB-B6ICUR": {
                "ordertxid": "O7FMOR-EB22Q-2WRAIO",
                "postxid": "TKH2SE-M7IF5-CFI7LT",
                "pair": "XXBTZEUR",
                "time": 1607901147.8306,
                "type": "sell",
                "ordertype": "limit",
                "price": "15790.00000",
                "cost": "0.03221",
                "fee": "0.00005",
                "vol": "0.00000204",
                "margin": "0.00000",
                "misc": ""
            },
            "TONDLM-MU5UO-PQ5BXP": {
                "ordertxid": "O7FMOR-EB22Q-2WRAIO",
                "postxid": "TKH2SE-M7IF5-CFI7LT",
                "pair": "XXBTZEUR",
                "time": 1607901147.8289,
                "type": "sell",
                "ordertype": "limit",
                "price": "15790.00000",
                "cost": "20.10588",
                "fee": "0.03217",
                "vol": "0.00127333",
                "margin": "0.00000",
                "misc": ""
            },
            "TAULH7-IJW5X-GACOVR": {
                "ordertxid": "O724P5-2JP2R-6EXLIZ",
                "postxid": "TKH2SE-M7IF5-CFI7LT",
                "pair": "XXBTZEUR",
                "time": 1607863427.4836,
                "type": "sell",
                "ordertype": "limit",
                "price": "15990.00000",
                "cost": "21.78190",
                "fee": "0.03485",
                "vol": "0.00136222",
                "margin": "0.00000",
                "misc": ""
            },
            "TAHHVY-5JD3M-WYFN3O": {
                "ordertxid": "OJLUUM-P2HVB-CX4BJK",
                "postxid": "TKH2SE-M7IF5-CFI7LT",
                "pair": "XXBTZEUR",
                "time": 1607342219.0355,
                "type": "buy",
                "ordertype": "limit",
                "price": "15810.00000",
                "cost": "21.53670",
                "fee": "0.03446",
                "vol": "0.00136222",
                "margin": "0.00000",
                "misc": ""
            },
            "TRVTYN-74MXA-IIL3C6": {
                "ordertxid": "OLU5G6-HWWWU-KD57UD",
                "postxid": "TKH2SE-M7IF5-CFI7LT",
                "pair": "XXBTZEUR",
                "time": 1607296160.355,
                "type": "sell",
                "ordertype": "limit",
                "price": "15890.00000",
                "cost": "21.60579",
                "fee": "0.03457",
                "vol": "0.00135971",
                "margin": "0.00000",
                "misc": ""
            },
            "TI4HQQ-OOTMH-45TU4O": {
                "ordertxid": "ORZ6BN-RHX2E-IEV625",
                "postxid": "TKH2SE-M7IF5-CFI7LT",
                "pair": "XXBTZEUR",
                "time": 1607249504.1654,
                "type": "buy",
                "ordertype": "limit",
                "price": "15700.00000",
                "cost": "21.34730",
                "fee": "0.03416",
                "vol": "0.00135970",
                "margin": "0.00000",
                "misc": ""
            },
            "TVVCII-ZB4S2-2MKCRN": {
                "ordertxid": "OZX7CB-ESHYN-LGB7CH",
                "postxid": "TKH2SE-M7IF5-CFI7LT",
                "pair": "XXBTZEUR",
                "time": 1607146864.2825,
                "type": "sell",
                "ordertype": "limit",
                "price": "15695.00000",
                "cost": "21.41583",
                "fee": "0.03427",
                "vol": "0.00136450",
                "margin": "0.00000",
                "misc": ""
            },
            "TKEUVQ-YK4IT-R33M6W": {
                "ordertxid": "OQXLHB-R3U6E-IG2KOG",
                "postxid": "TKH2SE-M7IF5-CFI7LT",
                "pair": "XXBTZEUR",
                "time": 1607123470.6233,
                "type": "buy",
                "ordertype": "limit",
                "price": "15490.00000",
                "cost": "21.13620",
                "fee": "0.03382",
                "vol": "0.00136451",
                "margin": "0.00000",
                "misc": ""
            },
            "TWBKDY-4JJBM-TK4O6C": {
                "ordertxid": "OD346T-7G63I-RKN6NE",
                "postxid": "TKH2SE-M7IF5-CFI7LT",
                "pair": "XXBTZEUR",
                "time": 1606742054.9615,
                "type": "sell",
                "ordertype": "limit",
                "price": "15800.00000",
                "cost": "20.15085",
                "fee": "0.03224",
                "vol": "0.00127537",
                "margin": "0.00000",
                "misc": ""
            },
            "T6QNTU-WMNYR-OO3H3N": {
                "ordertxid": "O5Z562-OWWSQ-4OFFLR",
                "postxid": "TKH2SE-M7IF5-CFI7LT",
                "pair": "XXBTZEUR",
                "time": 1606361455.3344,
                "type": "buy",
                "ordertype": "limit",
                "price": "15050.00000",
                "cost": "19.64010",
                "fee": "0.03142",
                "vol": "0.00130499",
                "margin": "0.00000",
                "misc": ""
            },
            "TKWKFF-WDNTV-35ICXO": {
                "ordertxid": "OT5CSC-SQXDY-Z4LPQO",
                "postxid": "TKH2SE-M7IF5-CFI7LT",
                "pair": "XXBTZEUR",
                "time": 1606276632.6302,
                "type": "buy",
                "ordertype": "limit",
                "price": "15800.00000",
                "cost": "19.68285",
                "fee": "0.03149",
                "vol": "0.00124575",
                "margin": "0.00000",
                "misc": ""
            },
            "TN6ZNG-DJ4UG-Z22QII": {
                "ordertxid": "OILWJT-7VRGA-SU3CLJ",
                "postxid": "TKH2SE-M7IF5-CFI7LT",
                "pair": "XXBTZEUR",
                "time": 1606210009.1098,
                "type": "sell",
                "ordertype": "touched market",
                "price": "15839.90282",
                "cost": "20.34192",
                "fee": "0.05289",
                "vol": "0.00128422",
                "margin": "0.00000",
                "misc": ""
            },
            "T4VFV3-T34K6-MD6MXS": {
                "ordertxid": "OWD26Y-KYPMG-466NWC",
                "postxid": "TKH2SE-M7IF5-CFI7LT",
                "pair": "XXBTZEUR",
                "time": 1606200380.3451,
                "type": "sell",
                "ordertype": "limit",
                "price": "15450.00000",
                "cost": "19.84135",
                "fee": "0.03175",
                "vol": "0.00128423",
                "margin": "0.00000",
                "misc": ""
            },
            "TSAR5J-SIH6R-RGRAPS": {
                "ordertxid": "OIQO7K-2I643-ACHWSR",
                "postxid": "TKH2SE-M7IF5-CFI7LT",
                "pair": "XXBTZEUR",
                "time": 1606044910.1985,
                "type": "buy",
                "ordertype": "limit",
                "price": "15000.00000",
                "cost": "19.24635",
                "fee": "0.03079",
                "vol": "0.00128309",
                "margin": "0.00000",
                "misc": ""
            },
            "T6AIRW-XUCIA-PUYTLZ": {
                "ordertxid": "OPICCX-XMXXS-7RAR2K",
                "postxid": "TKH2SE-M7IF5-CFI7LT",
                "pair": "XXBTZEUR",
                "time": 1606030266.4011,
                "type": "buy",
                "ordertype": "limit",
                "price": "15400.00000",
                "cost": "19.79454",
                "fee": "0.03167",
                "vol": "0.00128536",
                "margin": "0.00000",
                "misc": ""
            },
            "T2VB4W-UG57F-VWRFZ3": {
                "ordertxid": "O363AU-RI34O-2FX5HM",
                "postxid": "TKH2SE-M7IF5-CFI7LT",
                "pair": "XXBTZEUR",
                "time": 1605874371.1311,
                "type": "sell",
                "ordertype": "touched market",
                "price": "15372.19215",
                "cost": "20.05118",
                "fee": "0.05213",
                "vol": "0.00130438",
                "margin": "0.00000",
                "misc": ""
            },
            "TVFF5W-2PHT2-DNRW7D": {
                "ordertxid": "OAJFRB-YTJMS-IIPPIX",
                "postxid": "TKH2SE-M7IF5-CFI7LT",
                "pair": "XXBTZEUR",
                "time": 1605677734.3975,
                "type": "buy",
                "ordertype": "limit",
                "price": "14553.20000",
                "cost": "18.98290",
                "fee": "0.03037",
                "vol": "0.00130438",
                "margin": "0.00000",
                "misc": ""
            },
            "TOVAXW-WSDZD-XUSKJT": {
                "ordertxid": "O6ZBSI-QY73K-DHWLS6",
                "postxid": "TKH2SE-M7IF5-CFI7LT",
                "pair": "XXBTZEUR",
                "time": 1605542701.4968,
                "type": "sell",
                "ordertype": "touched market",
                "price": "13948.89875",
                "cost": "38.55643",
                "fee": "0.10025",
                "vol": "0.00276412",
                "margin": "0.00000",
                "misc": ""
            },
            "TV4Z7A-TI7Y2-KLDL2W": {
                "ordertxid": "OZKRLV-KM5YO-VNJV5W",
                "postxid": "TKH2SE-M7IF5-CFI7LT",
                "pair": "XXBTZEUR",
                "time": 1605283505.1257,
                "type": "buy",
                "ordertype": "limit",
                "price": "13650.00000",
                "cost": "24.08020",
                "fee": "0.03853",
                "vol": "0.00176412",
                "margin": "0.00000",
                "misc": ""
            },
            "TUCVMC-AEX3J-2TEFFR": {
                "ordertxid": "OV5RZL-GKTL6-ZDHV2J",
                "postxid": "TKH2SE-M7IF5-CFI7LT",
                "pair": "XXBTZEUR",
                "time": 1605253368.432,
                "type": "buy",
                "ordertype": "limit",
                "price": "13787.70000",
                "cost": "13.78770",
                "fee": "0.03585",
                "vol": "0.00100000",
                "margin": "0.00000",
                "misc": ""
            }
        },
        "count": 62
    }

    act(() => {
      render(<Balance balance={dataBalance} tradesHistory={dataTradesHistory} test='true'/>, container);
    });
  
    expect(
      container.querySelector("[data-testid='balance']")
    ).toHaveTextContent('test');
  
});

/*
describe('Render Balance component', () => {
    
    console.log(dataBalance);

    describe('render the Ticker component', () => {
        ({ getByTestId } = render(<Balance balance={dataBalance}/>))

        //const balance=getByTestId('balance');
        const chart=getByTestId('chart');
        const accordion=getByTestId('accordion');
        const toggle1=getByTestId('toggle1');
        const body1=getByTestId('body1');
        const toggle2=getByTestId('toggle2');
        const body2=getByTestId('body2');

        it('check if Balance is correctly implemented with all his childs', () => {
            expect(balance.toContainElement(chart));
            expect(balance.toContainElement(accordion));
            expect(accordion.toContainElement(toggle1));
            expect(accordion.toContainElement(body1));
            expect(accordion.toContainElement(toggle2));
            expect(accordion.toContainElement(body2));
        });
        
        it('check if Balance is correctly implemented with all his childs', () => {
            //expect(balance.toContainElement(chart));
            //expect(getByTestId('balance')).toContainElement(chart);
        });
    });
});
*/