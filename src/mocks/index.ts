import { Request } from "express";
import { Response } from "supertest";

export const mockRequest = {

} as Request;

export const mockResponse = {
  send: jest.fn(),
} as unknown as Response