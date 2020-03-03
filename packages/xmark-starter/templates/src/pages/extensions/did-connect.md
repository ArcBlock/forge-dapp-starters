---
title: 'Page Test'
path: '/extensions/did-connect'
layout: 'page'
---

## DID Connect Demo {.section}

### Protect Inline Content

```markdown
!LoginProtected[this is the secret content that reveals when you are logged in](){}
```

!LoginProtected[this is the secret content that reveals when you are logged in](){}

### Protect Block Content

```markdown
::: LoginProtected

### what makes a good xmark extension?

- Should support inline markdown extension
- Should support block extension
- Should support plain react components
  :::
```

::: LoginProtected

### what makes a good xmark extension?

- Should support inline markdown extension
- Should support block extension
- Should support plain react components
  :::
