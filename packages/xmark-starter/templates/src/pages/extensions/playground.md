---
title: 'Page Test'
path: '/extensions/playground'
layout: 'page'
disableLogin: true
---

## Playground Actions {.section}

> Note the `disableLogin` settings in the markdown source header.

### Basic Syntax

```markdown
!PlaygroundAction[action]{props}
```

### All Options

- `action`: available actions are listed below, full list is [here](https://github.com/ArcBlock/gatsby-extensions/issues/56)
  - `receive_foreign_token`: Recharge on local chain, LBD
  - `receive_local_token`: Recharge on foreign chain, AUSD
  - `send_local_token`: Ask user to send to playground account
  - `send_foreign_token`: Ask user to send to playground account
  - `exchange_to_local_token`: Exchange foreign token to local token, AUSD --> LBD
  - `exchange_to_foreign_token`: Exchange local token to foreign token, LBD --> AUSD
- `props.title`: shown on the button, and also on the qrcode popup
- `props.buttonText`: if not set, will show `title` on the button
- `props.buttonColor`: available options `primary|secondary|default|danger`
- `props.buttonVariant`: available options `outlined|contained|default`
- `props.buttonSize`: available options `small|medium|large`
- `props.buttonRounded`: whether the button is rounded or not, available options `true|false`
- `props.scanMessage`: text tip to describe why user should scan the qrcode, default to `Scan the QRCode with your ABT Wallet`
- `props.confirmMessage`: text tip to tell user to confirm in wallet, default to `Confirm in your ABT Wallet`
- `props.successMessage`: text tip to tell user when operation succeeded, default to `Operation success!`
- `props.amount`: how much to send/receive in currency related actions, must be a valid number or `random`
- `props.exchangeRate`: the exchange rate to use in exchange related actions, must be a valid number
- `props.price`: asset price on exchange or swap
- `props.name`: asset name
- `props.description`: asset description
- `props.location`: ticket location
- `props.backgroundUrl`: asset background image url
- `props.logoUrl`: asset logo image url
- `props.logoUrl`: asset logo image url
- `props.style`: any valid css style, such as `margin-left: 10px; width: 240px;`

Following options are available if you want to setup complex exchange scenarios.

- `props.payAmount`: token or asset amount for exchange sender, defaults to 1
- `props.receiveAmount`: token or asset amount for exchange receiver, defaults to 1
- `props.payType`: `token|certificate|badge|ticket` to send
- `props.receiveType`: `token|certificate|badge|ticket` to receive

### Quick Demos

### Login

```markdown
!PlaygroundAction[login]{title="Create Account" buttonVariant="outlined" buttonColor="default" successMessage="Welcome (%user.name%)"}
```

!PlaygroundAction[login]{title="Create Account" buttonVariant="outlined" buttonColor="default" successMessage="Welcome (%user.name%)"}

### Receive Tokens

```markdown
!PlaygroundAction[receive_local_token]{title="Get 10 LBD Token" buttonColor="secondary" amount=10 style="margin-right: 16px;"}
!PlaygroundAction[receive_local_token]{title="Get Random LBD Token" buttonVariant="outlined" buttonColor="default" amount="random"}
```

!PlaygroundAction[receive_local_token]{title="Get 10 (%token.local.symbol%) Token" buttonColor="secondary" amount=10 style="margin-right: 16px;"}
!PlaygroundAction[receive_local_token]{title="Get Random (%token.local.symbol%) Token" buttonVariant="outlined" buttonColor="default" amount="random"}

```markdown
!PlaygroundAction[receive_foreign_token]{title="Get 10 AUSD Token" buttonColor="primary" amount=10 style="margin-right: 16px; width: 360px;"}
!PlaygroundAction[receive_foreign_token]{title="Get Random AUSD Token" buttonVariant="contained" buttonColor="default" amount="random"}
```

!PlaygroundAction[receive_foreign_token]{title="Get 10 (%token.foreign.symbol%) Token" buttonColor="primary" amount=10 style="margin-right: 16px;"}
!PlaygroundAction[receive_foreign_token]{title="Get Random (%token.foreign.symbol%) Token" buttonVariant="contained" buttonColor="default" amount="random"}

### Swap Tokens

```markdown
!PlaygroundAction[exchange_to_local_token]{title="Sell 1 AUSD for 100 LBD" buttonColor="primary" exchangeRate=100 style="margin-right: 16px;"}
!PlaygroundAction[exchange_to_foreign_token]{title="Buy 1 AUSD with 100 LBD" buttonColor="primary" exchangeRate=100 style="margin-right: 16px;"}
```

!PlaygroundAction[exchange_to_local_token]{title="Sell 1 (%token.foreign.symbol%) for 100 (%token.local.symbol%)" buttonColor="primary" exchangeRate=100 style="margin-right: 16px;"}
!PlaygroundAction[exchange_to_local_token]{title="Sell 1 (%token.foreign.symbol%) with 100 (%token.local.symbol%)" buttonColor="primary" exchangeRate=100 style="margin-right: 16px;"}

### Swap Assets

```markdown
!PlaygroundAction[buy_local_certificate_with_foreign_token]{title="Buy Certificate with 1 (%token.foreign.symbol%)" buttonColor="primary" price=1 name="Local Certificate" description="Local Certificate" style="margin-right: 16px;"}
!PlaygroundAction[sell_local_certificate_for_foreign_token]{title="Sell Certificate for 1 (%token.foreign.symbol%)" buttonColor="primary" price=1 name="Local Certificate" style="margin-right: 16px;"}
```

!PlaygroundAction[buy_local_certificate_with_foreign_token]{title="Buy Certificate with 1 (%token.foreign.symbol%)" buttonColor="primary" price=1 name="Local Certificate" description="Local Certificate" style="margin-right: 16px;"}
!PlaygroundAction[sell_local_certificate_for_foreign_token]{title="Sell Certificate for 1 (%token.foreign.symbol%)" buttonColor="primary" price=1 name="Local Certificate" style="margin-right: 16px;"}

### Exchange Assets

```markdown
!PlaygroundAction[buy_local_certificate_with_local_token]{title="Buy Certificate with 0.99 (%token.local.symbol%)" buttonColor="primary" price=0.99 name="Local Certificate" description="Local Certificate" style="margin-right: 16px;"}
!PlaygroundAction[sell_local_certificate_for_local_token]{title="Sell Certificate for 0.99 (%token.local.symbol%)" buttonColor="primary" price=0.99 name="Local Certificate" style="margin-right: 16px;"}
```

!PlaygroundAction[buy_local_certificate_with_local_token]{title="Buy Certificate with 0.99 (%token.local.symbol%)" buttonColor="primary" price=0.99 name="Local Certificate" description="Local Certificate" style="margin-right: 16px;"}
!PlaygroundAction[sell_local_certificate_for_local_token]{title="Sell Certificate for 0.99 (%token.local.symbol%)" buttonColor="primary" price=0.99 name="Local Certificate" style="margin-right: 16px;"}
