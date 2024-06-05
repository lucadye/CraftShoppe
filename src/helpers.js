function formatPath(path) {
  switch (path) {
    case '/':         return 'home';
    case '/products': return 'products';
    case '/about':    return 'about';
    case '/contact':  return 'contact';
    default:          return;
  }
}

export {
  formatPath,
};
