import { exit } from "process";
import { ethers } from "ethers";
import { abi as ABI, deployedBytecode as BYTE_CODE } from "../artifacts/contracts/BalancerGetter.sol/BalanceGetter.json";
import { JsonFragment } from "@ethersproject/abi";

let WETH_ADDRESS = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
let V3_POOL_ADDRESSES = [
    "0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8", // USDC / WETH
    "0xcbcdf9626bc03e24f779434178a73a0b4bad62ed", // WBTC / WETH
    "0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640", // USDC / WETH
    "0xc2e9f25be6257c210d7adf0d4cd6e3e881ba25f8", // DAI / WETH
    "0x290a6a7460b308ee3f19023d2d00de604bcf5b42", // MATIC / WETH
    "0x5764a6f2212d502bc5970f9f129ffcd61e5d7563", // SHIB / WETH
    "0xf56d08221b5942c428acc5de8f78489a97fc5599", // GNO / WETH
    "0x4b5ab61593a2401b1075b90c04cbcdd3f87ce011", // LOOKS / WETH
    "0xe931b03260b2854e77e8da8378a1bc017b13cb97", // 1inch / WETH
]

async function main() {
    if (process.env.RPC_ADDR == undefined) {
        console.error("$RPC_ADDR not set.")
        exit(-1);
    }
    let rpcAddr = process.env.RPC_ADDR!;


    let result = await callUndeployed(rpcAddr, "readBalances", [WETH_ADDRESS, V3_POOL_ADDRESSES], BYTE_CODE, ABI)
    console.log(result)
}

async function callUndeployed(rpcAddr: string, functionName: string, params: any[], bytecode: string, abi: JsonFragment[]): Promise<ethers.utils.Result> {
    let provider = new ethers.providers.JsonRpcProvider(rpcAddr)
    let virtualContractAddress = "0xDEADBEEFDEADBEEFDEADBEEFDEADBEEFDEADBEEF"
    let functionInterface = new ethers.utils.Interface(abi)
    let functionCall = functionInterface.encodeFunctionData(
        functionName,
        params
    )
    let tx = {
        to: virtualContractAddress,
        data: functionCall
    }
    let storageOverride: any = {}
    storageOverride[virtualContractAddress] = {
        "code": bytecode
    }
    let result = await provider.send("eth_call", [tx, 'latest', storageOverride])
    let decoded = functionInterface.decodeFunctionResult("readBalances", result)
    return decoded
}

main()
    .then(_ => exit(1))
    .catch(err => {
        console.error(err)
        exit(-1)
    })