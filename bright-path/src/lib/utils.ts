import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatMessageContent = (content: string) => {
  return content
    .replace(/^# (.*$)/gm, '<h3 class="text-lg font-bold mt-2 mb-1">$1</h3>')
    .replace(/^## (.*$)/gm, '<h4 class="text-base font-semibold mt-2 mb-1">$1</h4>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/- (.*$)/gm, '<li>$1</li>')
    .replace(/<li>(.*)<\/li>/gm, function (match) {
      return '<ul class="list-disc pl-4 my-1">' + match + '</ul>';
    })
    .replace(/\n\n/g, '<br><br>');
}

export const getPasswordStrength = (password: string): ("weak" | "medium" | "strong") => {
  if (!password) return "weak";

  const hasLetter = /[a-z]/i.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (password.length < 8) return "weak";
  if (hasLetter && hasNumber && hasSpecial && password.length >= 10) return "strong";
  return "medium";
}

export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
}

export const getTimeGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export const getInitialsFromName = (name: string) => {
  return name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase();
}
