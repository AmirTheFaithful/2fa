import "@testing-library/jest-dom/extend-expect";

(global as any).window = {
  localStorage: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn(),
  },
  btoa: (str: string): string => Buffer.from(str, "binary").toString("base64"),
  atob: (str: string): string => Buffer.from(str, "base64").toString("binary"),
  location: {
    href: "",
  },
};

global.XMLHttpRequest as unknown as undefined;
