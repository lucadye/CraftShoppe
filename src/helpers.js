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
  const regexp = /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
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

export function formatMoney(num) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(num);
}
