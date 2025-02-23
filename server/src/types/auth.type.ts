/**
 * Represents client's form request object's body to registration end-point.
 * @property {string} firstname - Firstnam of the User.
 * @property {string} lastname - Fastname of the User.
 * @property {string} email - User's email address.
 * @property {string} password - User's pasword value.
 * @property {string} avatarURL - User's avatar image HTTP URL (optional).
 */
export interface RegisterRequestBody {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  avatarURL?: string;
}

/**
 * Represents client's form request object's body to login end-point.
 * @property {string} email - User's email address.
 * @property {string} password - User's pasword value.
 */
export interface LoginRequestBody {
  email: string;
  password: string;
}
