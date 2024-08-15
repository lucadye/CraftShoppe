export function formatPath(path) {
  switch (path) {
    case '/':         return 'home';
    case '/products': return 'products';
    case '/about':    return 'about';
    case '/contact':  return 'contact';
    default:          return;
  }
}

export function validEmail(email) {
  const regexp = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return regexp.test(email);
}

export function validPassword(pass) {
  if (pass.length < 12) return false;
  let valid = true
  const regexps = [
    /[A-Z]/, /[a-z]/,
    /[0-9]/, /[&*#!%@$.^_-]/
  ];
  regexps.forEach(r => valid = valid && r.test(pass));
  return valid;
}

// At least 1 of each: lowercase letter, capital letter, number, symbol.
export function passwordRequirements(pass) {
  if (pass === null) return;
  if (pass.length < 12) return 'Password must contain at least 12 characters.';
  if (!/[&*#!%@$.^_-]/.test(pass)) return 'Password must contain at least 1 symbol.';
  if (!/[0-9]/.test(pass)) return 'Password must contain at least 1 number.';
  if (!/[A-Z]/.test(pass)) return 'Password must contain at least 1 uppercase letter.';
  if (!/[a-z]/.test(pass)) return 'Password must contain at least 1 lowercase letter.';
  return '';
}

export function formatMoney(num) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(num);
}

export function formatNumber(str) {
  if (typeof str === 'number') return str;
  if (str === '') return str;
  const isNum = n => '1234567890'.includes(n);
  const isValid = (n, char) => {
    if (typeof char !== 'string') return isNum(n) ? n : '';
    else return (isNum(n) || n === char) ? n : '';
  };
  let arr = str.split('');
  let seenNumber = false;
  let foundDecimal = false;
  arr = arr.map(c => {
    if (seenNumber && !foundDecimal) {
      if (c === '.') foundDecimal = true;
      return isValid(c, '.');
    } else {
      if (isNum(c)) seenNumber = true;
      return isValid(c);
    }
  });
  str = arr.join('');
  if (str === '') return str;
  return Number(str);
}

export function formatDate(str) {
  const datetime = new Date(str);
  const year = datetime.getFullYear();
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const month = monthNames[datetime.getMonth()];
  const day = datetime.getDate();
  return `${year} ${month} ${day}`;
}
