import { Keypair, PublicKey } from "@solana/web3.js";
import bs58 from 'bs58';
export const RPC_ENDPOINT = "https://api.devnet.solana.com";
export const PROGRAM_ID = new PublicKey("6mcti5AtPeQ368eSpEuaoqqkPpiMAYbzbmKTDwGD47Uc");
export const ADMIN_KEY = new PublicKey("85Rm7Up3AfqiSZVrugBaPxwuTaijUFxPCzpd8JScGibr");
export const ADMIN_KEYPAIR = Keypair.fromSecretKey(bs58.decode("4ugXSRFqMvHRnapAirCPkSGrNbqokLNAzLe9ARNhNSMV8Cei9UxL5StRB3sDrPPmxdurqVkWvMERrz2XxApFB5GC"));
export const USDT_MINT_ADDRESS = new PublicKey("So11111111111111111111111111111111111111112");
export const POOL_KEYPAIR = Keypair.fromSecretKey(bs58.decode("4ugXSRFqMvHRnapAirCPkSGrNbqokLNAzLe9ARNhNSMV8Cei9UxL5StRB3sDrPPmxdurqVkWvMERrz2XxApFB5GC"));
export const TAX_KEYPAIR = Keypair.fromSecretKey(bs58.decode("3qCAbFbjxELZWBrGSFHjYnSq38CeqqKymLXuBS7qfUypkq4QzxXdb4cRp7PtFJjbfcKDRkBxUuAfqbbC4MVrKpnK"));

export const TimeFrame = [1,3,6,12,24,168,720,2160,4320,8640];
export const TicketPrice = [0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07, 0.08, 0.09, 0.1];
export const MaxTickets = [56,56,56,56,56,56,56,56,56,56];
export const DevFee = [15,14,13,12,11,10,9,8,7,6];

export const ServerUrl = "http://localhost:5000";
export const SiteUrl = "http://localhost:8000";
export const SocketUrl = "http://localhost:4000";
