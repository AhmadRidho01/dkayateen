// Product
export interface IVariant {
  name: string;
  isAvailable: boolean;
}

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  category: string;
  variants: IVariant[];
  images: string[];
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

// Testimonial
export interface ITestimonial {
  _id: string;
  name: string;
  role: string;
  message: string;
  avatar: string;
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
}

// API Response
export interface IApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

// Auth
export interface ILoginForm {
  username: string;
  password: string;
}

export interface IAuthState {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}
