import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { PlatformInfo } from "./PlatformInfo";

// Mock platform utilities
vi.mock("../utils/platform", () => ({
  getPlatform: vi.fn(),
  getOperatingSystem: vi.fn(),
}));

// Import after mock
import { getPlatform, getOperatingSystem } from "../utils/platform";

describe("PlatformInfo", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render loading state initially", () => {
    vi.mocked(getPlatform).mockImplementation(() => new Promise(() => {}));
    vi.mocked(getOperatingSystem).mockImplementation(
      () => new Promise(() => {})
    );

    render(<PlatformInfo />);

    expect(screen.getByTestId("platform-loading")).toBeInTheDocument();
  });

  it("should render web platform content", async () => {
    vi.mocked(getPlatform).mockResolvedValue("web");
    vi.mocked(getOperatingSystem).mockResolvedValue("mac");

    render(<PlatformInfo />);

    await waitFor(() => {
      expect(screen.getByTestId("platform-info")).toBeInTheDocument();
    });

    expect(screen.getByText("Web Browser")).toBeInTheDocument();
    expect(screen.getByText("Click to interact")).toBeInTheDocument();
  });

  it("should render iOS mobile content", async () => {
    vi.mocked(getPlatform).mockResolvedValue("ios");
    vi.mocked(getOperatingSystem).mockResolvedValue("ios");

    render(<PlatformInfo />);

    await waitFor(() => {
      expect(screen.getByTestId("platform-info")).toBeInTheDocument();
    });

    expect(screen.getByText("iOS Mobile")).toBeInTheDocument();
    expect(screen.getByText("Tap to interact")).toBeInTheDocument();
  });

  it("should render Android mobile content", async () => {
    vi.mocked(getPlatform).mockResolvedValue("android");
    vi.mocked(getOperatingSystem).mockResolvedValue("android");

    render(<PlatformInfo />);

    await waitFor(() => {
      expect(screen.getByTestId("platform-info")).toBeInTheDocument();
    });

    expect(screen.getByText("Android Mobile")).toBeInTheDocument();
    expect(screen.getByText("Tap to interact")).toBeInTheDocument();
  });

  it("should render Electron desktop content", async () => {
    vi.mocked(getPlatform).mockResolvedValue("electron");
    vi.mocked(getOperatingSystem).mockResolvedValue("windows");

    render(<PlatformInfo />);

    await waitFor(() => {
      expect(screen.getByTestId("platform-info")).toBeInTheDocument();
    });

    expect(screen.getByText("Desktop Application")).toBeInTheDocument();
    expect(screen.getByText("Click to interact")).toBeInTheDocument();
  });
});
