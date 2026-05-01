import { PrismaClient } from '@/app/generated/prisma'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed with rich anime figure data...\n')

  // Clear old data
  console.log('🗑️  Clearing old data...')
  await prisma.reviewVote.deleteMany()
  await prisma.review.deleteMany()
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.cartItem.deleteMany()
  await prisma.wishlist.deleteMany()
  await prisma.payment.deleteMany()
  await prisma.shipping.deleteMany()
  await prisma.coupon.deleteMany()
  await prisma.address.deleteMany()
  await prisma.productCharacter.deleteMany()
  await prisma.productSeries.deleteMany()
  await prisma.productTag.deleteMany()
  await prisma.inventory.deleteMany()
  await prisma.productVariant.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
  await prisma.brand.deleteMany()
  await prisma.character.deleteMany()
  await prisma.series.deleteMany()
  await prisma.tag.deleteMany()
  await prisma.warehouse.deleteMany()
  await prisma.user.deleteMany()
  await prisma.admin.deleteMany()
  await prisma.announcement.deleteMany()
  console.log('✅ Cleared old data\n')

  // ===== 1. ADMIN =====
  console.log('👤 Creating admin...')
  const adminEmail = process.env.ADMIN_USERNAME || 'admin@otakushop.com'
  const adminRawPassword = process.env.ADMIN_PASSWORD || 'admin123'
  const adminDisplayName = process.env.ADMIN_DISPLAY_NAME || 'Admin Otaku Shop'
  const adminPassword = await bcrypt.hash(adminRawPassword, 10)
  const admin = await prisma.admin.create({
    data: {
      username: 'admin',
      passwordHash: adminPassword,
      fullName: adminDisplayName,
      email: adminEmail
    }
  })
  console.log(`✅ Created admin: ${admin.username} (${adminEmail})\n`)

  // ===== 2. BRANDS (Thương hiệu Figure nổi tiếng) =====
  console.log('🏭 Creating brands...')
  const brandsData = [
    { name: 'Good Smile Company', slug: 'good-smile-company' },
    { name: 'Bandai Spirits', slug: 'bandai-spirits' },
    { name: 'Kotobukiya', slug: 'kotobukiya' },
    { name: 'Max Factory', slug: 'max-factory' },
    { name: 'Alter', slug: 'alter' },
    { name: 'MegaHouse', slug: 'megahouse' },
    { name: 'Aniplex', slug: 'aniplex' },
    { name: 'Phat Company', slug: 'phat-company' },
    { name: 'FREEing', slug: 'freeing' },
    { name: 'Taito', slug: 'taito' },
    { name: 'Sega', slug: 'sega' },
    { name: 'Furyu', slug: 'furyu' },
    { name: 'Union Creative', slug: 'union-creative' },
    { name: 'Myethos', slug: 'myethos' },
    { name: 'Apex Innovation', slug: 'apex-innovation' },
  ]

  const brands: Record<string, string> = {}
  for (const brand of brandsData) {
    const created = await prisma.brand.create({ data: brand })
    brands[brand.slug] = created.id
  }
  console.log(`✅ Created ${brandsData.length} brands\n`)

  // ===== 3. SERIES (Anime/Game Series) =====
  console.log('📺 Creating series...')
  const seriesData = [
    { name: 'Demon Slayer: Kimetsu no Yaiba', slug: 'demon-slayer' },
    { name: 'Jujutsu Kaisen', slug: 'jujutsu-kaisen' },
    { name: 'One Piece', slug: 'one-piece' },
    { name: 'My Hero Academia', slug: 'my-hero-academia' },
    { name: 'Attack on Titan', slug: 'attack-on-titan' },
    { name: 'Spy x Family', slug: 'spy-x-family' },
    { name: 'Chainsaw Man', slug: 'chainsaw-man' },
    { name: 'Genshin Impact', slug: 'genshin-impact' },
    { name: 'Hololive Production', slug: 'hololive' },
    { name: 'Re:Zero', slug: 're-zero' },
    { name: 'Fate/Grand Order', slug: 'fate-grand-order' },
    { name: 'Sword Art Online', slug: 'sword-art-online' },
    { name: 'Naruto Shippuden', slug: 'naruto-shippuden' },
    { name: 'Dragon Ball', slug: 'dragon-ball' },
    { name: 'Bocchi the Rock!', slug: 'bocchi-the-rock' },
    { name: 'Frieren: Beyond Journey\'s End', slug: 'frieren' },
    { name: 'Blue Archive', slug: 'blue-archive' },
    { name: 'Oshi no Ko', slug: 'oshi-no-ko' },
    { name: 'Tokyo Revengers', slug: 'tokyo-revengers' },
    { name: 'Bleach', slug: 'bleach' },
  ]

  const series: Record<string, string> = {}
  for (const s of seriesData) {
    const created = await prisma.series.create({ data: s })
    series[s.slug] = created.id
  }
  console.log(`✅ Created ${seriesData.length} series\n`)

  // ===== 4. CHARACTERS =====
  console.log('👥 Creating characters...')
  const charactersData = [
    // Demon Slayer
    { name: 'Tanjiro Kamado', slug: 'tanjiro-kamado' },
    { name: 'Nezuko Kamado', slug: 'nezuko-kamado' },
    { name: 'Zenitsu Agatsuma', slug: 'zenitsu-agatsuma' },
    { name: 'Inosuke Hashibira', slug: 'inosuke-hashibira' },
    { name: 'Shinobu Kocho', slug: 'shinobu-kocho' },
    { name: 'Mitsuri Kanroji', slug: 'mitsuri-kanroji' },
    // Jujutsu Kaisen
    { name: 'Gojo Satoru', slug: 'gojo-satoru' },
    { name: 'Itadori Yuji', slug: 'itadori-yuji' },
    { name: 'Fushiguro Megumi', slug: 'fushiguro-megumi' },
    { name: 'Nobara Kugisaki', slug: 'nobara-kugisaki' },
    { name: 'Ryomen Sukuna', slug: 'ryomen-sukuna' },
    // One Piece
    { name: 'Monkey D. Luffy', slug: 'monkey-d-luffy' },
    { name: 'Roronoa Zoro', slug: 'roronoa-zoro' },
    { name: 'Nami', slug: 'nami' },
    { name: 'Nico Robin', slug: 'nico-robin' },
    { name: 'Boa Hancock', slug: 'boa-hancock' },
    // Genshin Impact
    { name: 'Hu Tao', slug: 'hu-tao' },
    { name: 'Raiden Shogun', slug: 'raiden-shogun' },
    { name: 'Ganyu', slug: 'ganyu' },
    { name: 'Keqing', slug: 'keqing' },
    { name: 'Nahida', slug: 'nahida' },
    { name: 'Furina', slug: 'furina' },
    // Spy x Family
    { name: 'Anya Forger', slug: 'anya-forger' },
    { name: 'Yor Forger', slug: 'yor-forger' },
    { name: 'Loid Forger', slug: 'loid-forger' },
    // Chainsaw Man
    { name: 'Denji', slug: 'denji' },
    { name: 'Power', slug: 'power' },
    { name: 'Makima', slug: 'makima' },
    // Re:Zero
    { name: 'Rem', slug: 'rem' },
    { name: 'Ram', slug: 'ram' },
    { name: 'Emilia', slug: 'emilia' },
    // Hololive
    { name: 'Gawr Gura', slug: 'gawr-gura' },
    { name: 'Shirakami Fubuki', slug: 'shirakami-fubuki' },
    { name: 'Usada Pekora', slug: 'usada-pekora' },
    { name: 'Hoshimachi Suisei', slug: 'hoshimachi-suisei' },
    // Frieren
    { name: 'Frieren', slug: 'frieren' },
    { name: 'Fern', slug: 'fern' },
    // Oshi no Ko
    { name: 'Ai Hoshino', slug: 'ai-hoshino' },
    { name: 'Aqua Hoshino', slug: 'aqua-hoshino' },
    { name: 'Ruby Hoshino', slug: 'ruby-hoshino' },
    // Bocchi the Rock
    { name: 'Bocchi (Hitori Gotoh)', slug: 'bocchi-hitori-gotoh' },
  ]

  const characters: Record<string, string> = {}
  for (const c of charactersData) {
    const created = await prisma.character.create({ data: c })
    characters[c.slug] = created.id
  }
  console.log(`✅ Created ${charactersData.length} characters\n`)

  // ===== 5. CATEGORIES =====
  console.log('📁 Creating categories...')
  const categoriesData = [
    {
      name: 'Scale Figures',
      slug: 'scale-figures',
      description: 'Mô hình tỉ lệ cao cấp 1/4, 1/6, 1/7, 1/8 với chi tiết sắc nét',
      imageUrl: 'https://placehold.co/400x300/8B5CF6/FFF?text=Scale+Figures'
    },
    {
      name: 'Nendoroid',
      slug: 'nendoroid',
      description: 'Figure chibi đầu to dễ thương từ Good Smile Company',
      imageUrl: 'https://placehold.co/400x300/EC4899/FFF?text=Nendoroid'
    },
    {
      name: 'Figma',
      slug: 'figma',
      description: 'Action figure có khớp cử động linh hoạt từ Max Factory',
      imageUrl: 'https://placehold.co/400x300/3B82F6/FFF?text=Figma'
    },
    {
      name: 'Pop Up Parade',
      slug: 'pop-up-parade',
      description: 'Figure giá rẻ chất lượng cao từ Good Smile Company',
      imageUrl: 'https://placehold.co/400x300/10B981/FFF?text=Pop+Up+Parade'
    },
    {
      name: 'Prize Figures',
      slug: 'prize-figures',
      description: 'Figure từ máy gắp Nhật Bản (Taito, Banpresto, Sega)',
      imageUrl: 'https://placehold.co/400x300/F59E0B/FFF?text=Prize+Figures'
    },
    {
      name: 'Gunpla & Mecha',
      slug: 'gunpla-mecha',
      description: 'Mô hình lắp ráp Gundam và robot từ Bandai',
      imageUrl: 'https://placehold.co/400x300/EF4444/FFF?text=Gunpla'
    },
    {
      name: 'Plush & Mascot',
      slug: 'plush-mascot',
      description: 'Gấu bông, thú nhồi bông và mascot anime',
      imageUrl: 'https://placehold.co/400x300/A855F7/FFF?text=Plush'
    },
    {
      name: 'Manga & Artbook',
      slug: 'manga-artbook',
      description: 'Truyện tranh Nhật Bản và sách tranh nghệ thuật',
      imageUrl: 'https://placehold.co/400x300/6366F1/FFF?text=Manga'
    },
  ]

  const categories: Record<string, string> = {}
  for (const cat of categoriesData) {
    const created = await prisma.category.create({ data: cat })
    categories[cat.slug] = created.id
  }
  console.log(`✅ Created ${categoriesData.length} categories\n`)

  // ===== 6. PRODUCTS (50+ sản phẩm figure thực tế) =====
  console.log('📦 Creating products...')

  const productsData = [
    // ========== SCALE FIGURES ==========
    {
      name: 'Nezuko Kamado 1/8 Scale Figure - Demon Form',
      slug: 'nezuko-kamado-demon-form-scale',
      shortDescription: 'Mô hình Nezuko phiên bản quỷ, chi tiết sắc nét',
      description: `Mô hình Nezuko Kamado tỉ lệ 1/8 từ anime Demon Slayer: Kimetsu no Yaiba. Phiên bản Demon Form với hiệu ứng máu nghệ thuật. Sản phẩm chính hãng Aniplex với chất lượng sơn cao cấp, chi tiết từng sợi tóc và trang phục. Đi kèm đế dựng trong suốt.

Thông số:
- Tỉ lệ: 1/8
- Chiều cao: 22cm (bao gồm đế)
- Chất liệu: PVC, ABS
- Nhà sản xuất: Aniplex
- Xuất xứ: Nhật Bản`,
      price: 2850000,
      comparePrice: 3200000,
      stockQuantity: 8,
      images: [
        'https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?w=600',
        'https://placehold.co/600x600/EC4899/FFF?text=Nezuko+Back',
        'https://placehold.co/600x600/EC4899/FFF?text=Nezuko+Detail'
      ],
      categoryId: categories['scale-figures'],
      brandId: brands['aniplex'],
      featured: true,
      preorderStatus: 'NONE' as const,
      releaseCountry: 'JP' as const,
      msrpValue: 16800,
      msrpCurrency: 'JPY',
      condition: 'New - Sealed',
      reviewCount: 24,
      averageRating: 4.9
    },
    {
      name: 'Gojo Satoru 1/7 Scale Figure - Domain Expansion',
      slug: 'gojo-satoru-domain-expansion-scale',
      shortDescription: 'Gojo với hiệu ứng Unlimited Void tuyệt đẹp',
      description: `Mô hình Gojo Satoru tỉ lệ 1/7 từ Jujutsu Kaisen. Phiên bản Domain Expansion với hiệu ứng Unlimited Void xung quanh. Mắt xanh lấp lánh sử dụng sơn đặc biệt phát sáng dưới ánh đèn UV.

Thông số:
- Tỉ lệ: 1/7
- Chiều cao: 28cm
- Chất liệu: PVC, ABS
- Nhà sản xuất: Kotobukiya
- Có LED tích hợp`,
      price: 4500000,
      comparePrice: 5200000,
      stockQuantity: 5,
      images: [
        'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=600',
        'https://placehold.co/600x600/3B82F6/FFF?text=Gojo+Detail'
      ],
      categoryId: categories['scale-figures'],
      brandId: brands['kotobukiya'],
      featured: true,
      preorderStatus: 'NONE' as const,
      reviewCount: 31,
      averageRating: 4.8
    },
    {
      name: 'Mitsuri Kanroji 1/7 Scale - Love Breathing',
      slug: 'mitsuri-kanroji-love-breathing',
      shortDescription: 'Luyến Trụ Mitsuri với tư thế chiến đấu',
      description: `Mô hình Mitsuri Kanroji - Luyến Trụ từ Demon Slayer. Tư thế Love Breathing form với kiếm uốn lượn đặc trưng. Tóc gradient hồng-xanh tuyệt đẹp.

- Tỉ lệ: 1/7
- Chiều cao: 24cm
- Chất liệu: PVC, ABS
- Nhà sản xuất: Alter`,
      price: 3800000,
      stockQuantity: 4,
      images: [
        'https://placehold.co/600x600/EC4899/FFF?text=Mitsuri+1',
        'https://placehold.co/600x600/EC4899/FFF?text=Mitsuri+2'
      ],
      categoryId: categories['scale-figures'],
      brandId: brands['alter'],
      featured: true,
      preorderStatus: 'PREORDER' as const,
      preorderCutoff: new Date('2025-03-30'),
      releaseDate: new Date('2025-08-15'),
      reviewCount: 0,
      averageRating: 0
    },
    {
      name: 'Raiden Shogun 1/7 Scale Figure - Musou Isshin',
      slug: 'raiden-shogun-musou-isshin',
      shortDescription: 'Lôi Thần với kiếm Musou Isshin',
      description: `Mô hình Raiden Shogun từ Genshin Impact. Phiên bản rút kiếm Musou Isshin từ ngực với hiệu ứng sấm sét. Đế dựng có LED tím.

- Tỉ lệ: 1/7
- Chiều cao: 32cm (bao gồm đế)
- Nhà sản xuất: Apex Innovation
- Có LED tích hợp`,
      price: 5200000,
      comparePrice: 5800000,
      stockQuantity: 6,
      images: [
        'https://placehold.co/600x600/8B5CF6/FFF?text=Raiden+Shogun',
        'https://placehold.co/600x600/8B5CF6/FFF?text=Raiden+Detail'
      ],
      categoryId: categories['scale-figures'],
      brandId: brands['apex-innovation'],
      featured: true,
      preorderStatus: 'NONE' as const,
      reviewCount: 18,
      averageRating: 4.7
    },
    {
      name: 'Hu Tao 1/7 Scale Figure - Papilio Charontis',
      slug: 'hu-tao-papilio-charontis',
      shortDescription: 'Hồ Đào với Skill Elemental',
      description: `Mô hình Hu Tao từ Genshin Impact trong tư thế kích hoạt Skill. Hiệu ứng lửa và bướm xung quanh. Bao gồm 2 biểu cảm mặt.

- Tỉ lệ: 1/7
- Chiều cao: 28cm
- Nhà sản xuất: Myethos`,
      price: 4200000,
      stockQuantity: 7,
      images: [
        'https://placehold.co/600x600/EF4444/FFF?text=Hu+Tao',
        'https://placehold.co/600x600/EF4444/FFF?text=Hu+Tao+Alt'
      ],
      categoryId: categories['scale-figures'],
      brandId: brands['myethos'],
      featured: true,
      preorderStatus: 'NONE' as const,
      reviewCount: 22,
      averageRating: 4.9
    },
    {
      name: 'Rem 1/7 Scale Figure - Crystal Dress Ver.',
      slug: 'rem-crystal-dress-scale',
      shortDescription: 'Rem với váy pha lê lộng lẫy',
      description: `Mô hình Rem từ Re:Zero phiên bản Crystal Dress. Váy được làm từ nhựa trong suốt mô phỏng pha lê, chi tiết cực kỳ tinh xảo.

- Tỉ lệ: 1/7
- Chiều cao: 25cm
- Nhà sản xuất: Good Smile Company
- Limited Edition`,
      price: 4800000,
      comparePrice: 5500000,
      stockQuantity: 3,
      images: [
        'https://placehold.co/600x600/60A5FA/FFF?text=Rem+Crystal',
        'https://placehold.co/600x600/60A5FA/FFF?text=Rem+Detail'
      ],
      categoryId: categories['scale-figures'],
      brandId: brands['good-smile-company'],
      featured: true,
      preorderStatus: 'NONE' as const,
      condition: 'New - Limited Edition',
      reviewCount: 45,
      averageRating: 5.0
    },
    {
      name: 'Power 1/7 Scale Figure - Blood Fiend',
      slug: 'power-blood-fiend-scale',
      shortDescription: 'Power với tư thế chiến đấu',
      description: `Mô hình Power từ Chainsaw Man. Tư thế cầm rìu máu với biểu cảm tự tin đặc trưng.

- Tỉ lệ: 1/7
- Chiều cao: 26cm
- Nhà sản xuất: Kotobukiya`,
      price: 3200000,
      stockQuantity: 9,
      images: [
        'https://placehold.co/600x600/DC2626/FFF?text=Power',
        'https://placehold.co/600x600/DC2626/FFF?text=Power+2'
      ],
      categoryId: categories['scale-figures'],
      brandId: brands['kotobukiya'],
      featured: false,
      preorderStatus: 'NONE' as const,
      reviewCount: 15,
      averageRating: 4.6
    },
    {
      name: 'Makima 1/7 Scale Figure - Control Devil',
      slug: 'makima-control-devil',
      shortDescription: 'Makima với ánh mắt quyến rũ',
      description: `Mô hình Makima từ Chainsaw Man. Tư thế đứng thanh lịch với biểu cảm bí ẩn đặc trưng.

- Tỉ lệ: 1/7
- Chiều cao: 25cm
- Nhà sản xuất: FREEing`,
      price: 3600000,
      stockQuantity: 5,
      images: [
        'https://placehold.co/600x600/F97316/FFF?text=Makima'
      ],
      categoryId: categories['scale-figures'],
      brandId: brands['freeing'],
      featured: false,
      preorderStatus: 'PREORDER' as const,
      preorderCutoff: new Date('2025-02-28'),
      releaseDate: new Date('2025-07-01'),
      reviewCount: 0,
      averageRating: 0
    },
    {
      name: 'Yor Forger 1/7 Scale Figure - Thorn Princess',
      slug: 'yor-forger-thorn-princess',
      shortDescription: 'Yor trong trang phục Thorn Princess',
      description: `Mô hình Yor Forger từ Spy x Family phiên bản assassin. Trang phục đen quyến rũ với vũ khí đặc trưng.

- Tỉ lệ: 1/7
- Chiều cao: 27cm
- Nhà sản xuất: Good Smile Company`,
      price: 3400000,
      stockQuantity: 12,
      images: [
        'https://placehold.co/600x600/1F2937/FFF?text=Yor+Thorn'
      ],
      categoryId: categories['scale-figures'],
      brandId: brands['good-smile-company'],
      featured: true,
      preorderStatus: 'NONE' as const,
      reviewCount: 28,
      averageRating: 4.8
    },
    {
      name: 'Frieren 1/7 Scale Figure - Magic Casting',
      slug: 'frieren-magic-casting',
      shortDescription: 'Frieren đang thực hiện phép thuật',
      description: `Mô hình Frieren từ "Frieren: Beyond Journey's End". Tư thế đang niệm chú với hiệu ứng phép thuật xanh.

- Tỉ lệ: 1/7
- Chiều cao: 24cm
- Nhà sản xuất: Good Smile Company
- Anime mới nhất 2024!`,
      price: 3900000,
      stockQuantity: 10,
      images: [
        'https://placehold.co/600x600/818CF8/FFF?text=Frieren'
      ],
      categoryId: categories['scale-figures'],
      brandId: brands['good-smile-company'],
      featured: true,
      preorderStatus: 'PREORDER' as const,
      preorderCutoff: new Date('2025-04-15'),
      releaseDate: new Date('2025-09-01'),
      reviewCount: 0,
      averageRating: 0
    },
    {
      name: 'Ai Hoshino 1/7 Scale Figure - Idol Costume',
      slug: 'ai-hoshino-idol-costume',
      shortDescription: 'Ai trong trang phục idol lung linh',
      description: `Mô hình Ai Hoshino từ Oshi no Ko. Trang phục idol với ngôi sao trong mắt đặc trưng.

- Tỉ lệ: 1/7
- Chiều cao: 26cm
- Nhà sản xuất: Good Smile Company`,
      price: 3700000,
      stockQuantity: 8,
      images: [
        'https://placehold.co/600x600/FBBF24/FFF?text=Ai+Hoshino'
      ],
      categoryId: categories['scale-figures'],
      brandId: brands['good-smile-company'],
      featured: true,
      preorderStatus: 'NONE' as const,
      reviewCount: 35,
      averageRating: 4.9
    },

    // ========== NENDOROID ==========
    {
      name: 'Nendoroid Gojo Satoru',
      slug: 'nendoroid-gojo-satoru',
      shortDescription: 'Gojo chibi dễ thương với nhiều phụ kiện',
      description: `Nendoroid Gojo Satoru từ Jujutsu Kaisen. Đi kèm nhiều biểu cảm mặt và phụ kiện: mặt nạ, hiệu ứng phép thuật, tay thay thế.

- Số hiệu: No. 1684
- Chiều cao: 10cm
- Nhà sản xuất: Good Smile Company
- Bao gồm: 3 mặt, 6 tay, stand`,
      price: 890000,
      comparePrice: 1050000,
      stockQuantity: 20,
      images: [
        'https://placehold.co/600x600/3B82F6/FFF?text=Nendoroid+Gojo'
      ],
      categoryId: categories['nendoroid'],
      brandId: brands['good-smile-company'],
      featured: true,
      preorderStatus: 'NONE' as const,
      reviewCount: 52,
      averageRating: 4.9
    },
    {
      name: 'Nendoroid Anya Forger',
      slug: 'nendoroid-anya-forger',
      shortDescription: 'Anya chibi với biểu cảm hehe nổi tiếng',
      description: `Nendoroid Anya Forger từ Spy x Family. Bao gồm biểu cảm "hehe" nổi tiếng và nhiều phụ kiện.

- Số hiệu: No. 1902
- Chiều cao: 10cm
- Bao gồm: 4 mặt (hehe face!), đồng phục, Mr. Chimera`,
      price: 850000,
      stockQuantity: 25,
      images: [
        'https://placehold.co/600x600/EC4899/FFF?text=Nendoroid+Anya'
      ],
      categoryId: categories['nendoroid'],
      brandId: brands['good-smile-company'],
      featured: true,
      preorderStatus: 'NONE' as const,
      reviewCount: 68,
      averageRating: 5.0
    },
    {
      name: 'Nendoroid Tanjiro Kamado',
      slug: 'nendoroid-tanjiro-kamado',
      shortDescription: 'Tanjiro chibi với kiếm Nichirin',
      description: `Nendoroid Tanjiro Kamado từ Demon Slayer. Bao gồm kiếm, hiệu ứng Water Breathing, hộp gỗ.

- Số hiệu: No. 1193
- Chiều cao: 10cm
- Đi kèm: kiếm Nichirin, Water Breathing effect`,
      price: 820000,
      stockQuantity: 18,
      images: [
        'https://placehold.co/600x600/EF4444/FFF?text=Nendoroid+Tanjiro'
      ],
      categoryId: categories['nendoroid'],
      brandId: brands['good-smile-company'],
      featured: false,
      preorderStatus: 'NONE' as const,
      reviewCount: 42,
      averageRating: 4.8
    },
    {
      name: 'Nendoroid Nezuko Kamado',
      slug: 'nendoroid-nezuko-kamado',
      shortDescription: 'Nezuko chibi có thể thu nhỏ vào hộp',
      description: `Nendoroid Nezuko Kamado từ Demon Slayer. Bao gồm hộp gỗ có thể mở để Nezuko nằm vào.

- Số hiệu: No. 1194
- Chiều cao: 10cm (form thường), 4cm (form nhỏ)
- Đặc biệt: có thể biến hình thu nhỏ!`,
      price: 850000,
      stockQuantity: 15,
      images: [
        'https://placehold.co/600x600/EC4899/FFF?text=Nendoroid+Nezuko'
      ],
      categoryId: categories['nendoroid'],
      brandId: brands['good-smile-company'],
      featured: false,
      preorderStatus: 'NONE' as const,
      reviewCount: 56,
      averageRating: 4.9
    },
    {
      name: 'Nendoroid Luffy Gear 5',
      slug: 'nendoroid-luffy-gear5',
      shortDescription: 'Luffy phiên bản Gear 5 Nika',
      description: `Nendoroid Monkey D. Luffy phiên bản Gear 5 từ One Piece. Tóc trắng, mắt đỏ, biểu cảm cười đặc trưng.

- Chiều cao: 10cm
- Phiên bản mới nhất 2024!`,
      price: 920000,
      stockQuantity: 12,
      images: [
        'https://placehold.co/600x600/FBBF24/FFF?text=Nendoroid+Gear5'
      ],
      categoryId: categories['nendoroid'],
      brandId: brands['good-smile-company'],
      featured: true,
      preorderStatus: 'NONE' as const,
      reviewCount: 25,
      averageRating: 4.7
    },
    {
      name: 'Nendoroid Gawr Gura',
      slug: 'nendoroid-gawr-gura',
      shortDescription: 'VTuber cá mập dễ thương',
      description: `Nendoroid Gawr Gura từ Hololive EN. Bao gồm đinh ba, đuôi cá mập, nhiều biểu cảm.

- Số hiệu: No. 1688
- Chiều cao: 10cm
- Hololive Official License`,
      price: 880000,
      stockQuantity: 10,
      images: [
        'https://placehold.co/600x600/60A5FA/FFF?text=Nendoroid+Gura'
      ],
      categoryId: categories['nendoroid'],
      brandId: brands['good-smile-company'],
      featured: false,
      preorderStatus: 'NONE' as const,
      reviewCount: 38,
      averageRating: 4.9
    },
    {
      name: 'Nendoroid Bocchi (Hitori Gotoh)',
      slug: 'nendoroid-bocchi-hitori-gotoh',
      shortDescription: 'Bocchi với guitar và hộp giấy',
      description: `Nendoroid Bocchi từ Bocchi the Rock! Bao gồm guitar, hộp giấy để trốn, nhiều biểu cảm lo lắng.

- Chiều cao: 10cm
- Anime hit 2023!`,
      price: 850000,
      stockQuantity: 14,
      images: [
        'https://placehold.co/600x600/EC4899/FFF?text=Nendoroid+Bocchi'
      ],
      categoryId: categories['nendoroid'],
      brandId: brands['good-smile-company'],
      featured: true,
      preorderStatus: 'NONE' as const,
      reviewCount: 32,
      averageRating: 4.8
    },

    // ========== FIGMA ==========
    {
      name: 'Figma Guts - Black Swordsman Ver.',
      slug: 'figma-guts-black-swordsman',
      shortDescription: 'Guts với Dragon Slayer Sword',
      description: `Figma Guts từ Berta phiên bản Black Swordsman. Kiếm Dragon Slayer có thể tháo rời, nhiều khớp cử động.

- Số hiệu: No. 410
- Chiều cao: 17cm
- Đi kèm: Dragon Slayer, cánh tay máy, crossbow`,
      price: 1850000,
      stockQuantity: 6,
      images: [
        'https://placehold.co/600x600/1F2937/FFF?text=Figma+Guts'
      ],
      categoryId: categories['figma'],
      brandId: brands['max-factory'],
      featured: false,
      preorderStatus: 'NONE' as const,
      reviewCount: 28,
      averageRating: 4.9
    },
    {
      name: 'Figma Link - Tears of the Kingdom Ver.',
      slug: 'figma-link-totk',
      shortDescription: 'Link với Ultrahand và paraglider',
      description: `Figma Link từ Zelda: Tears of the Kingdom. Trang phục mới với cánh tay Zonai.

- Chiều cao: 14cm
- Bao gồm: Master Sword, Hylian Shield, paraglider`,
      price: 1650000,
      stockQuantity: 8,
      images: [
        'https://placehold.co/600x600/22C55E/FFF?text=Figma+Link'
      ],
      categoryId: categories['figma'],
      brandId: brands['max-factory'],
      featured: true,
      preorderStatus: 'NONE' as const,
      reviewCount: 19,
      averageRating: 4.8
    },
    {
      name: 'Figma Miku Hatsune - V4X',
      slug: 'figma-miku-v4x',
      shortDescription: 'Miku phiên bản V4X mới nhất',
      description: `Figma Hatsune Miku phiên bản V4X. Trang phục mới với nhiều phụ kiện.

- Chiều cao: 14cm
- Bao gồm: micro, leek, nhiều biểu cảm`,
      price: 1450000,
      stockQuantity: 15,
      images: [
        'https://placehold.co/600x600/06B6D4/FFF?text=Figma+Miku'
      ],
      categoryId: categories['figma'],
      brandId: brands['max-factory'],
      featured: false,
      preorderStatus: 'NONE' as const,
      reviewCount: 45,
      averageRating: 4.7
    },

    // ========== POP UP PARADE ==========
    {
      name: 'Pop Up Parade Denji - Chainsaw Man',
      slug: 'pop-up-parade-denji',
      shortDescription: 'Denji trong form Chainsaw Man',
      description: `Pop Up Parade Denji từ Chainsaw Man. Giá cả phải chăng, chất lượng tốt.

- Chiều cao: 17cm
- Nhà sản xuất: Good Smile Company
- Giá tốt cho người mới sưu tầm!`,
      price: 480000,
      stockQuantity: 25,
      images: [
        'https://placehold.co/600x600/DC2626/FFF?text=PUP+Denji'
      ],
      categoryId: categories['pop-up-parade'],
      brandId: brands['good-smile-company'],
      featured: false,
      preorderStatus: 'NONE' as const,
      reviewCount: 33,
      averageRating: 4.5
    },
    {
      name: 'Pop Up Parade Zenitsu Agatsuma',
      slug: 'pop-up-parade-zenitsu',
      shortDescription: 'Zenitsu với Thunder Breathing',
      description: `Pop Up Parade Zenitsu từ Demon Slayer. Tư thế Thunder Breathing Form.

- Chiều cao: 17cm
- Giá tốt cho collector mới!`,
      price: 450000,
      stockQuantity: 30,
      images: [
        'https://placehold.co/600x600/FBBF24/FFF?text=PUP+Zenitsu'
      ],
      categoryId: categories['pop-up-parade'],
      brandId: brands['good-smile-company'],
      featured: false,
      preorderStatus: 'NONE' as const,
      reviewCount: 28,
      averageRating: 4.6
    },
    {
      name: 'Pop Up Parade Fern',
      slug: 'pop-up-parade-fern',
      shortDescription: 'Fern với cây phép thuật',
      description: `Pop Up Parade Fern từ Frieren. Tư thế sẵn sàng chiến đấu.

- Chiều cao: 17cm
- Anime hit 2024!`,
      price: 480000,
      stockQuantity: 18,
      images: [
        'https://placehold.co/600x600/A855F7/FFF?text=PUP+Fern'
      ],
      categoryId: categories['pop-up-parade'],
      brandId: brands['good-smile-company'],
      featured: true,
      preorderStatus: 'PREORDER' as const,
      preorderCutoff: new Date('2025-02-15'),
      releaseDate: new Date('2025-06-01'),
      reviewCount: 0,
      averageRating: 0
    },
    {
      name: 'Pop Up Parade Loid Forger',
      slug: 'pop-up-parade-loid-forger',
      shortDescription: 'Twilight với trang phục điệp viên',
      description: `Pop Up Parade Loid Forger từ Spy x Family. Trang phục công sở lịch lãm.

- Chiều cao: 17cm`,
      price: 450000,
      stockQuantity: 22,
      images: [
        'https://placehold.co/600x600/1F2937/FFF?text=PUP+Loid'
      ],
      categoryId: categories['pop-up-parade'],
      brandId: brands['good-smile-company'],
      featured: false,
      preorderStatus: 'NONE' as const,
      reviewCount: 18,
      averageRating: 4.4
    },

    // ========== PRIZE FIGURES ==========
    {
      name: 'Taito Coreful Figure - Rem Loungewear',
      slug: 'taito-rem-loungewear',
      shortDescription: 'Rem trong trang phục ở nhà',
      description: `Taito Coreful Figure Rem từ Re:Zero. Phiên bản loungewear dễ thương.

- Chiều cao: 20cm
- Nhà sản xuất: Taito
- Prize Figure chất lượng cao`,
      price: 380000,
      stockQuantity: 15,
      images: [
        'https://placehold.co/600x600/60A5FA/FFF?text=Taito+Rem'
      ],
      categoryId: categories['prize-figures'],
      brandId: brands['taito'],
      featured: false,
      preorderStatus: 'NONE' as const,
      reviewCount: 22,
      averageRating: 4.3
    },
    {
      name: 'Banpresto Grandista - Goku Ultra Instinct',
      slug: 'banpresto-goku-ui',
      shortDescription: 'Goku UI với chiều cao lớn',
      description: `Banpresto Grandista Goku Ultra Instinct từ Dragon Ball Super. Figure size lớn ấn tượng.

- Chiều cao: 28cm
- Nhà sản xuất: Banpresto`,
      price: 520000,
      stockQuantity: 10,
      images: [
        'https://placehold.co/600x600/3B82F6/FFF?text=Grandista+Goku'
      ],
      categoryId: categories['prize-figures'],
      brandId: brands['bandai-spirits'],
      featured: true,
      preorderStatus: 'NONE' as const,
      reviewCount: 35,
      averageRating: 4.6
    },
    {
      name: 'Sega SPM Figure - Miku Racing 2024',
      slug: 'sega-spm-miku-racing-2024',
      shortDescription: 'Miku phiên bản Racing Team',
      description: `Sega SPM Figure Hatsune Miku Racing 2024. Trang phục racing girl năm mới.

- Chiều cao: 21cm
- Limited yearly edition`,
      price: 420000,
      stockQuantity: 8,
      images: [
        'https://placehold.co/600x600/06B6D4/FFF?text=Sega+Miku'
      ],
      categoryId: categories['prize-figures'],
      brandId: brands['sega'],
      featured: false,
      preorderStatus: 'NONE' as const,
      reviewCount: 12,
      averageRating: 4.4
    },
    {
      name: 'FuRyu Trio Try iT - Sukuna',
      slug: 'furyu-sukuna',
      shortDescription: 'Sukuna với 4 tay và miệng',
      description: `FuRyu Figure Ryomen Sukuna từ Jujutsu Kaisen. Phiên bản full power với 4 tay.

- Chiều cao: 22cm`,
      price: 450000,
      stockQuantity: 12,
      images: [
        'https://placehold.co/600x600/7C3AED/FFF?text=FuRyu+Sukuna'
      ],
      categoryId: categories['prize-figures'],
      brandId: brands['furyu'],
      featured: false,
      preorderStatus: 'NONE' as const,
      reviewCount: 19,
      averageRating: 4.5
    },

    // ========== GUNPLA ==========
    {
      name: 'RG 1/144 Wing Gundam Zero EW',
      slug: 'rg-wing-gundam-zero-ew',
      shortDescription: 'Real Grade Wing Zero với cánh thiên thần',
      description: `RG Wing Gundam Zero EW từ Gundam Wing Endless Waltz. Cánh có thể gập mở, chi tiết cực cao.

- Tỉ lệ: 1/144
- Grade: Real Grade (RG)
- Bao gồm: Twin Buster Rifle, beam saber`,
      price: 680000,
      stockQuantity: 20,
      images: [
        'https://placehold.co/600x600/3B82F6/FFF?text=RG+Wing+Zero'
      ],
      categoryId: categories['gunpla-mecha'],
      brandId: brands['bandai-spirits'],
      featured: true,
      preorderStatus: 'NONE' as const,
      reviewCount: 42,
      averageRating: 4.9
    },
    {
      name: 'MG 1/100 Unicorn Gundam Ver.Ka',
      slug: 'mg-unicorn-gundam-verka',
      shortDescription: 'Master Grade Unicorn có thể biến hình',
      description: `MG Unicorn Gundam Ver.Ka từ Gundam UC. Có thể biến hình từ Unicorn Mode sang Destroy Mode.

- Tỉ lệ: 1/100
- Grade: Master Grade (MG)
- Ver.Ka design by Hajime Katoki`,
      price: 1450000,
      stockQuantity: 8,
      images: [
        'https://placehold.co/600x600/FAFAFA/333?text=MG+Unicorn'
      ],
      categoryId: categories['gunpla-mecha'],
      brandId: brands['bandai-spirits'],
      featured: true,
      preorderStatus: 'NONE' as const,
      reviewCount: 56,
      averageRating: 4.8
    },
    {
      name: 'PG 1/60 Strike Freedom Gundam',
      slug: 'pg-strike-freedom',
      shortDescription: 'Perfect Grade cao 37cm',
      description: `PG Strike Freedom Gundam từ Gundam SEED Destiny. Đẳng cấp cao nhất với LED tích hợp.

- Tỉ lệ: 1/60
- Chiều cao: 37cm
- Grade: Perfect Grade (PG)
- Bao gồm LED Unit`,
      price: 5800000,
      stockQuantity: 3,
      images: [
        'https://placehold.co/600x600/FBBF24/FFF?text=PG+Strike+Freedom'
      ],
      categoryId: categories['gunpla-mecha'],
      brandId: brands['bandai-spirits'],
      featured: true,
      preorderStatus: 'NONE' as const,
      condition: 'New - Premium',
      reviewCount: 18,
      averageRating: 5.0
    },
    {
      name: 'HG 1/144 Gundam Aerial',
      slug: 'hg-gundam-aerial',
      shortDescription: 'Gundam mới từ Witch from Mercury',
      description: `HG Gundam Aerial từ Mobile Suit Gundam: The Witch from Mercury. Gundam của Suletta.

- Tỉ lệ: 1/144
- Grade: High Grade (HG)
- Anime mới 2023-2024`,
      price: 380000,
      stockQuantity: 25,
      images: [
        'https://placehold.co/600x600/EC4899/FFF?text=HG+Aerial'
      ],
      categoryId: categories['gunpla-mecha'],
      brandId: brands['bandai-spirits'],
      featured: false,
      preorderStatus: 'NONE' as const,
      reviewCount: 38,
      averageRating: 4.6
    },

    // ========== PLUSH ==========
    {
      name: 'Pochacco Plush 30cm',
      slug: 'pochacco-plush-30cm',
      shortDescription: 'Gấu bông Pochacco mềm mại',
      description: `Gấu bông Pochacco từ Sanrio. Size 30cm, chất liệu mềm mại.

- Size: 30cm
- Chất liệu: Polyester
- Sanrio Official`,
      price: 350000,
      stockQuantity: 20,
      images: [
        'https://placehold.co/600x600/FAFAFA/333?text=Pochacco'
      ],
      categoryId: categories['plush-mascot'],
      featured: false,
      preorderStatus: 'NONE' as const,
      reviewCount: 15,
      averageRating: 4.7
    },
    {
      name: 'Anya Forger Plush - Heh Face',
      slug: 'anya-forger-plush-heh',
      shortDescription: 'Anya với biểu cảm hehe',
      description: `Gấu bông Anya Forger với biểu cảm "heh" nổi tiếng.

- Size: 25cm
- Official merchandise`,
      price: 420000,
      stockQuantity: 15,
      images: [
        'https://placehold.co/600x600/EC4899/FFF?text=Anya+Plush'
      ],
      categoryId: categories['plush-mascot'],
      featured: true,
      preorderStatus: 'NONE' as const,
      reviewCount: 28,
      averageRating: 4.9
    },

    // ========== MANGA & ARTBOOK ==========
    {
      name: 'Jujutsu Kaisen Vol.1-25 Box Set',
      slug: 'jujutsu-kaisen-box-set',
      shortDescription: 'Bộ manga JJK đầy đủ bản tiếng Việt',
      description: `Bộ manga Jujutsu Kaisen tập 1-25 bản tiếng Việt. Bao gồm box đựng và poster.

- Số tập: 25 tập
- Ngôn ngữ: Tiếng Việt
- NXB: Kim Đồng`,
      price: 1250000,
      comparePrice: 1500000,
      stockQuantity: 10,
      images: [
        'https://placehold.co/600x600/7C3AED/FFF?text=JJK+Box+Set'
      ],
      categoryId: categories['manga-artbook'],
      featured: true,
      preorderStatus: 'NONE' as const,
      reviewCount: 45,
      averageRating: 4.8
    },
    {
      name: 'Spy x Family Art Book',
      slug: 'spy-x-family-artbook',
      shortDescription: 'Art book chính thức từ tác giả',
      description: `Spy x Family Official Art Book. Bao gồm illustrations, concept art, interview.

- Ngôn ngữ: Tiếng Nhật
- Trang: 160 trang màu`,
      price: 580000,
      stockQuantity: 8,
      images: [
        'https://placehold.co/600x600/EC4899/FFF?text=SpyxFamily+Art'
      ],
      categoryId: categories['manga-artbook'],
      featured: false,
      preorderStatus: 'NONE' as const,
      reviewCount: 12,
      averageRating: 4.6
    },
    {
      name: 'Demon Slayer Vol.1-23 Complete Box',
      slug: 'demon-slayer-complete-box',
      shortDescription: 'Trọn bộ Demon Slayer bản tiếng Việt',
      description: `Bộ manga Kimetsu no Yaiba hoàn chỉnh 23 tập bản tiếng Việt.

- Số tập: 23 tập (hoàn)
- Ngôn ngữ: Tiếng Việt
- Bao gồm box collector`,
      price: 1150000,
      comparePrice: 1380000,
      stockQuantity: 6,
      images: [
        'https://placehold.co/600x600/EF4444/FFF?text=KnY+Box+Set'
      ],
      categoryId: categories['manga-artbook'],
      featured: true,
      preorderStatus: 'NONE' as const,
      reviewCount: 52,
      averageRating: 4.9
    },
  ]

  const createdProducts = []
  for (const product of productsData) {
    const p = await prisma.product.create({ 
      data: {
        ...product,
        categoryId: product.categoryId,
        brandId: product.brandId || null,
      }
    })
    createdProducts.push(p)
  }
  console.log(`✅ Created ${productsData.length} products\n`)

  // ===== 7. Link Products to Series & Characters =====
  console.log('🔗 Linking products to series and characters...')
  
  // Nezuko -> Demon Slayer, Nezuko
  await prisma.productSeries.create({ data: { productId: createdProducts[0].id, seriesId: series['demon-slayer'] } })
  await prisma.productCharacter.create({ data: { productId: createdProducts[0].id, characterId: characters['nezuko-kamado'] } })
  
  // Gojo -> JJK, Gojo
  await prisma.productSeries.create({ data: { productId: createdProducts[1].id, seriesId: series['jujutsu-kaisen'] } })
  await prisma.productCharacter.create({ data: { productId: createdProducts[1].id, characterId: characters['gojo-satoru'] } })
  
  // Mitsuri -> Demon Slayer, Mitsuri
  await prisma.productSeries.create({ data: { productId: createdProducts[2].id, seriesId: series['demon-slayer'] } })
  await prisma.productCharacter.create({ data: { productId: createdProducts[2].id, characterId: characters['mitsuri-kanroji'] } })
  
  // Raiden -> Genshin, Raiden
  await prisma.productSeries.create({ data: { productId: createdProducts[3].id, seriesId: series['genshin-impact'] } })
  await prisma.productCharacter.create({ data: { productId: createdProducts[3].id, characterId: characters['raiden-shogun'] } })
  
  // Hu Tao -> Genshin, Hu Tao
  await prisma.productSeries.create({ data: { productId: createdProducts[4].id, seriesId: series['genshin-impact'] } })
  await prisma.productCharacter.create({ data: { productId: createdProducts[4].id, characterId: characters['hu-tao'] } })
  
  // Rem -> Re:Zero, Rem
  await prisma.productSeries.create({ data: { productId: createdProducts[5].id, seriesId: series['re-zero'] } })
  await prisma.productCharacter.create({ data: { productId: createdProducts[5].id, characterId: characters['rem'] } })

  console.log('✅ Linked products to series and characters\n')

  // ===== 8. TEST USERS =====
  console.log('👤 Creating test users...')
  const userPassword = await bcrypt.hash('user123', 10)

  const user1 = await prisma.user.create({
    data: {
      email: 'user@example.com',
      passwordHash: userPassword,
      fullName: 'Nguyễn Văn A',
      phone: '0901234567',
      gender: 'MALE',
      dateOfBirth: new Date('1995-05-15'),
      emailVerified: true
    }
  })

  const user2 = await prisma.user.create({
    data: {
      email: 'user2@example.com',
      passwordHash: userPassword,
      fullName: 'Trần Thị B',
      phone: '0909876543',
      gender: 'FEMALE',
      dateOfBirth: new Date('1998-08-20'),
      emailVerified: true
    }
  })

  const user3 = await prisma.user.create({
    data: {
      email: 'user3@example.com',
      passwordHash: userPassword,
      fullName: 'Lê Văn C',
      phone: '0905555555',
      gender: 'MALE',
      emailVerified: true
    }
  })

  console.log('✅ Created 3 test users\n')

  // ===== 9. ADDRESSES =====
  console.log('📍 Creating addresses...')
  await prisma.address.createMany({
    data: [
      {
        userId: user1.id,
        label: 'Nhà riêng',
        fullName: 'Nguyễn Văn A',
        phone: '0901234567',
        address: '123 Nguyễn Văn Linh',
        ward: 'Tân Phong',
        district: 'Quận 7',
        city: 'Hồ Chí Minh',
        isDefault: true
      },
      {
        userId: user1.id,
        label: 'Văn phòng',
        fullName: 'Nguyễn Văn A',
        phone: '0901234567',
        address: '456 Lê Văn Việt',
        ward: 'Hiệp Phú',
        district: 'TP. Thủ Đức',
        city: 'Hồ Chí Minh',
        isDefault: false
      },
      {
        userId: user2.id,
        label: 'Nhà',
        fullName: 'Trần Thị B',
        phone: '0909876543',
        address: '789 Trần Hưng Đạo',
        ward: 'Cầu Ông Lãnh',
        district: 'Quận 1',
        city: 'Hồ Chí Minh',
        isDefault: true
      }
    ]
  })
  console.log('✅ Created 3 addresses\n')

  // ===== 10. COUPONS =====
  console.log('🎟️  Creating coupons...')
  await prisma.coupon.createMany({
    data: [
      {
        code: 'WELCOME10',
        type: 'PERCENTAGE',
        value: 10,
        minOrder: 500000,
        maxDiscount: 100000,
        validFrom: new Date('2025-01-01'),
        validTo: new Date('2025-12-31'),
        usageLimit: 1000,
        description: 'Giảm 10% cho đơn hàng đầu tiên (tối đa 100k)',
        isActive: true
      },
      {
        code: 'FREESHIP50',
        type: 'FIXED_AMOUNT',
        value: 50000,
        minOrder: 800000,
        validFrom: new Date('2025-01-01'),
        validTo: new Date('2025-12-31'),
        description: 'Giảm 50k phí ship cho đơn từ 800k',
        isActive: true
      },
      {
        code: 'FIGURE20',
        type: 'PERCENTAGE',
        value: 20,
        minOrder: 2000000,
        maxDiscount: 500000,
        validFrom: new Date('2025-01-01'),
        validTo: new Date('2025-06-30'),
        usageLimit: 100,
        description: 'Giảm 20% cho Figure từ 2 triệu (tối đa 500k)',
        isActive: true
      },
      {
        code: 'NENDO15',
        type: 'PERCENTAGE',
        value: 15,
        minOrder: 1500000,
        maxDiscount: 200000,
        validFrom: new Date('2025-01-01'),
        validTo: new Date('2025-12-31'),
        description: 'Giảm 15% khi mua Nendoroid từ 1.5 triệu',
        isActive: true
      },
      {
        code: 'GUNPLA10',
        type: 'PERCENTAGE',
        value: 10,
        minOrder: 1000000,
        maxDiscount: 150000,
        validFrom: new Date('2025-01-01'),
        validTo: new Date('2025-12-31'),
        description: 'Giảm 10% cho Gunpla từ 1 triệu',
        isActive: true
      }
    ]
  })
  console.log('✅ Created 5 coupons\n')

  // ===== 11. SAMPLE REVIEWS =====
  console.log('⭐ Creating sample reviews...')

  const reviewsData = [
    {
      productId: createdProducts[0].id, // Nezuko
      userId: user1.id,
      rating: 5,
      title: 'Figure đẹp xuất sắc!',
      comment: 'Mô hình Nezuko rất đẹp, chi tiết từng sợi tóc. Đóng gói cẩn thận, ship nhanh. Đáng đồng tiền!',
      isVerified: true,
      isApproved: true,
      helpfulCount: 25
    },
    {
      productId: createdProducts[0].id,
      userId: user2.id,
      rating: 5,
      title: 'Chính hãng, chất lượng cao',
      comment: 'Mua tặng em, em thích lắm. Sơn đẹp, không có lỗi. Highly recommend!',
      isVerified: true,
      isApproved: true,
      helpfulCount: 18
    },
    {
      productId: createdProducts[1].id, // Gojo
      userId: user1.id,
      rating: 5,
      title: 'Gojo quá đẹp!',
      comment: 'Hiệu ứng Domain Expansion tuyệt vời. Mắt xanh phát sáng rất đẹp. Worth every penny!',
      isVerified: true,
      isApproved: true,
      helpfulCount: 32
    },
    {
      productId: createdProducts[1].id,
      userId: user3.id,
      rating: 4,
      title: 'Tốt nhưng giá cao',
      comment: 'Figure rất đẹp, nhưng giá hơi chát. Chất lượng thì không chê được.',
      isVerified: false,
      isApproved: true,
      helpfulCount: 12
    },
    {
      productId: createdProducts[5].id, // Rem
      userId: user2.id,
      rating: 5,
      title: 'Rem là best girl!',
      comment: 'Crystal Dress đẹp lung linh, trong suốt như pha lê thật. Limited edition nên mua ngay!',
      isVerified: true,
      isApproved: true,
      helpfulCount: 45
    },
    {
      productId: createdProducts[11].id, // Nendoroid Gojo
      userId: user1.id,
      rating: 5,
      title: 'Nendoroid chất lượng GSC',
      comment: 'Đúng chất lượng Good Smile. Nhiều phụ kiện, nhiều biểu cảm. Đáng mua!',
      isVerified: true,
      isApproved: true,
      helpfulCount: 28
    },
    {
      productId: createdProducts[12].id, // Nendoroid Anya
      userId: user2.id,
      rating: 5,
      title: 'Anya kawaii quá!',
      comment: 'Biểu cảm hehe y như trong anime. Mua về không muốn bỏ xuống luôn 😍',
      isVerified: true,
      isApproved: true,
      helpfulCount: 52
    },
    {
      productId: createdProducts[12].id,
      userId: user3.id,
      rating: 5,
      title: 'Must have cho fan Spy x Family',
      comment: 'Chi tiết tốt, sơn đẹp. Đi kèm Mr. Chimera nữa, cute lắm!',
      isVerified: true,
      isApproved: true,
      helpfulCount: 38
    },
    {
      productId: createdProducts[23].id, // RG Wing Zero
      userId: user1.id,
      rating: 5,
      title: 'RG đỉnh cao!',
      comment: 'Chi tiết không thể tin được cho kit 1/144. Cánh mở ra đẹp lắm. Recommend cho ai thích Gundam Wing!',
      isVerified: true,
      isApproved: true,
      helpfulCount: 35
    },
    {
      productId: createdProducts[24].id, // MG Unicorn
      userId: user2.id,
      rating: 5,
      title: 'Unicorn biến hình smooth',
      comment: 'Biến từ Unicorn sang Destroy Mode mượt lắm. Ver.Ka design đẹp. Worth the price!',
      isVerified: true,
      isApproved: true,
      helpfulCount: 42
    }
  ]

  for (const review of reviewsData) {
    await prisma.review.create({ data: review })
  }
  console.log(`✅ Created ${reviewsData.length} sample reviews\n`)

  // ===== 12. ANNOUNCEMENTS =====
  console.log('📢 Creating announcements...')
  await prisma.announcement.createMany({
    data: [
      {
        title: '🎉 Chào mừng đến OtakuShop!',
        summary: 'OtakuShop - Thiên đường Figure & Anime chính hãng tại Việt Nam',
        content: 'Chào mừng bạn đến với OtakuShop! Chúng tôi chuyên cung cấp các sản phẩm Figure, Nendoroid, Gunpla chính hãng từ Nhật Bản. Đảm bảo 100% authentic, đóng gói cẩn thận, giao hàng toàn quốc.',
        isActive: true
      },
      {
        title: '🚚 Freeship đơn từ 500k',
        summary: 'Miễn phí vận chuyển cho đơn hàng từ 500.000đ',
        content: 'Áp dụng cho tất cả đơn hàng nội thành HCM và Hà Nội. Các tỉnh khác giảm 30k phí ship.',
        isActive: true
      },
      {
        title: '⏰ Pre-order mở đơn hàng tháng!',
        summary: 'Đặt trước Figure mới nhất với giá ưu đãi',
        content: 'Pre-order Figure chính hãng với giá sớm (Early Bird). Thanh toán trước 50%, còn lại khi hàng về. Đảm bảo có hàng cho bạn!',
        isActive: true
      }
    ]
  })
  console.log('✅ Created 3 announcements\n')

  console.log('🎉 Seed completed with rich anime figure data!\n')
  console.log('📊 Summary:')
  console.log(`  - Admin: ${adminEmail} / ${adminRawPassword}`)
  console.log('  - Users: 3 (user@example.com / user123)')
  console.log(`  - Brands: ${brandsData.length}`)
  console.log(`  - Series: ${seriesData.length}`)
  console.log(`  - Characters: ${charactersData.length}`)
  console.log(`  - Categories: ${categoriesData.length}`)
  console.log(`  - Products: ${productsData.length}`)
  console.log('  - Addresses: 3')
  console.log('  - Coupons: 5')
  console.log(`  - Reviews: ${reviewsData.length}`)
  console.log('  - Announcements: 3')
  console.log('')
  console.log('🔐 Login Credentials:')
  console.log(`  Admin: ${adminEmail} / ${adminRawPassword}`)
  console.log('  User 1: user@example.com / user123')
  console.log('  User 2: user2@example.com / user123')
  console.log('  User 3: user3@example.com / user123')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })







