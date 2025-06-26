import '../app/styles/footer.css';

export default function FooterSection() {
  return (
    <footer className="site-footer">
      <p>© {new Date().getFullYear()} VINRSR. All Rights Reserved.</p> Made with ❤️
    </footer>
  );
}