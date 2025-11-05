# Lottie Animations

Folder ini untuk menyimpan file Lottie animation (.json)

## Download Lottie Animations

Kamu bisa download gratis dari:
- https://lottiefiles.com/
- https://lottiefiles.com/featured

## Yang dibutuhkan untuk About Us section:

1. **target.json** - Icon untuk "Terintegrasi" (target/bullseye icon)
2. **zap.json** - Icon untuk "Real-time" (lightning/zap icon)  
3. **lock.json** - Icon untuk "Aman" (lock/security icon)
4. **trending-up.json** - Icon untuk "Scalable" (chart/growth icon)
5. **rocket.json** - Icon untuk "Keunggulan EOS ERP" (rocket icon)

## Cara pakai:

Setelah download, simpan file .json ke folder ini, lalu update path di `src/components/AboutUs.tsx`:

```typescript
const features = [
  {
    lottie: '/lottie/target.json',  // Update ke path local
    title: 'Terintegrasi',
    description: '...'
  },
  // dst...
]
```

## Catatan:

Saat ini component menggunakan URL dari lottie.host. Untuk production, lebih baik download dan simpan local untuk performa dan reliability yang lebih baik.
