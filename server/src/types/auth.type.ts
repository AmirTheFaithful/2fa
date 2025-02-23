/**
 * Represents client's form request to registration end-point.
 * @property {string} firstname - Firstnam of the User.
 * @property {string} lastname - Fastname of the User.
 * @property {string} email - User's email address.
 * @property {string} password - User's pasword value.
 * @property {string} email - User's avatar HTTP URL.
 * @property {string} email - User's email address.
 * @property {string} avatarURL - User's avatar image URL (optional).
 */
export interface RegisterRequestBody {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  avatarURL?: string;
}
