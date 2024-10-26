import { PublicKey } from "@solana/web3.js";
import bs58 from 'bs58';

export const RPC_ENDPOINT = import.meta.env.VITE_RPC_ENDPOINT;
export const PROGRAM_ID = new PublicKey(import.meta.env.VITE_PROGRAM_ID);
export const ADMIN_KEY = new PublicKey(import.meta.env.VITE_ADMIN_KEY);
export const POOL_KEY = new PublicKey(import.meta.env.VITE_POOL_KEY);

export const TimeFrame = import.meta.env.VITE_TimeFrame.split(',').map(Number);
export const TicketPrice = import.meta.env.VITE_TicketPrice.split(',').map(Number);
export const MaxTickets = import.meta.env.VITE_MaxTickets.split(',').map(Number);
export const DevFee = import.meta.env.VITE_DevFee.split(',').map(Number);

export const ServerUrl = import.meta.env.VITE_ServerUrl;
export const SiteUrl = import.meta.env.VITE_SiteUrl;
export const SocketUrl = import.meta.env.VITE_SocketUrl;