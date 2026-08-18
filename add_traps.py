import os

# login.html
with open('login.html', 'r', encoding='utf-8') as f:
    content = f.read()
content = content.replace('class="phantom-input form-input"', 'class="phantom-input form-input mirage-input typo-generator"')
with open('login.html', 'w', encoding='utf-8') as f:
    f.write(content)

# checkout.html
with open('checkout.html', 'r', encoding='utf-8') as f:
    content = f.read()
content = content.replace('class="form-input"', 'class="form-input mirage-input typo-generator"')
with open('checkout.html', 'w', encoding='utf-8') as f:
    f.write(content)

# contact.html (random tabindex)
with open('contact.html', 'r', encoding='utf-8') as f:
    content = f.read()
content = content.replace('<input type="text" class="form-input" placeholder="Your Name" required>', '<input type="text" class="form-input" placeholder="Your Name" required tabindex="5">')
content = content.replace('<input type="email" class="form-input" placeholder="Your Email" required>', '<input type="email" class="form-input" placeholder="Your Email" required tabindex="2">')
content = content.replace('<textarea class="form-input" rows="5" placeholder="Your Message" required></textarea>', '<textarea class="form-input" rows="5" placeholder="Your Message" required tabindex="8"></textarea>')
content = content.replace('<button type="submit" class="btn btn-primary chasing-button" style="width: 100%;">', '<button type="submit" class="btn btn-primary chasing-button" style="width: 100%;" tabindex="1">')
with open('contact.html', 'w', encoding='utf-8') as f:
    f.write(content)

# products.html
with open('products.html', 'r', encoding='utf-8') as f:
    content = f.read()
content = content.replace('class="fake-button" onclick="event.stopPropagation(); removeFromWishlist(1)"', 'class="fake-button loop-link" onclick="event.stopPropagation(); removeFromWishlist(1)"')
content = content.replace('class="fake-button" onclick="event.stopPropagation(); removeFromWishlist(2)"', 'class="fake-button loop-link" onclick="event.stopPropagation(); removeFromWishlist(2)"')
with open('products.html', 'w', encoding='utf-8') as f:
    f.write(content)

# account.html (Schrodinger toggle)
with open('account.html', 'r', encoding='utf-8') as f:
    content = f.read()

toggle_html = '''
                        <div class="schrodinger-container" style="margin-top: 2rem;">
                            <span style="font-weight: 500;">Enable Advanced Features</span>
                            <input type="checkbox" class="schrodinger-toggle">
                        </div>
'''
content = content.replace('<p style="color: var(--text-muted); margin-bottom: 2rem;">Manage your subscription and billing details.</p>', '<p style="color: var(--text-muted); margin-bottom: 2rem;">Manage your subscription and billing details.</p>' + toggle_html) 

with open('account.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("HTML traps added")
