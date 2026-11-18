import type { SampleArticle } from "./types";
export type { SampleArticle } from "./types";

// Presentation fixtures, not a database/editor schema. The byline is a placeholder.
const sampleAuthor = "Tác giả Khoảng lặng";

export const sampleArticles: readonly SampleArticle[] = [
  {
    id: "nhung-khoang-dung",
    status: "published",
    slug: "nhung-khoang-dung",
    title: "Những khoảng dừng giữa một ngày bận rộn",
    category: "Đời sống",
    author: sampleAuthor,
    publishedAt: "2026-11-16",
    content: [
      { type: "paragraph", text: "Buổi sáng ấy, tôi ngồi bên cửa sổ lâu hơn thường lệ. Ngoài đường, tiếng xe vẫn nối nhau đi qua. Trên bàn, tách trà đã nguội từ lúc nào. Tôi định đứng dậy để bắt đầu công việc tiếp theo, rồi chợt nhận ra mình chưa kịp cảm nhận buổi sáng đang trôi qua." },
      { type: "paragraph", text: "Có những ngày mọi việc đều được hoàn thành, nhưng đến tối tôi không nhớ nổi một khoảnh khắc nào thật rõ. Lịch làm việc kín chỗ, còn ký ức thì mỏng đi. Tôi đã có mặt ở nhiều nơi, chỉ riêng với mình là chưa." },
      { type: "heading", level: 2, text: "Một khoảng trống vừa đủ" },
      { type: "paragraph", text: "Tôi thử để lại một khoảng nhỏ giữa hai việc. Không mở điện thoại khi chờ nước sôi. Không bật thêm âm thanh khi đi bộ ra đầu ngõ. Những khoảng dừng ấy chẳng làm ngày dài hơn, nhưng khiến tôi thấy mình đang thực sự sống trong đó." },
      { type: "blockquote", text: "Một ngày đáng nhớ đôi khi bắt đầu bằng việc cho phép mình dừng lại." },
      { type: "heading", level: 3, text: "Những điều tôi đang thử" },
      { type: "list", ordered: false, items: ["Uống hết một tách trà mà không nhìn màn hình.", "Đứng bên cửa sổ và quan sát ánh sáng thay đổi.", "Dành vài phút cuối ngày để nhớ lại một điều dễ chịu."] },
      { type: "paragraph", text: "Tôi vẫn bận rộn, vẫn có những buổi chiều cuống quýt. Nhưng giờ đây, khi thấy tách trà nguội trên bàn, tôi coi đó như một lời nhắc nhẹ: có thể ngồi xuống thêm một lát. Công việc còn đó, và buổi sáng cũng xứng đáng được mình nhìn thấy." },
    ],
    excerpt: "Một tách trà để nguội, một ô cửa mở. Đôi khi, điều ta cần chỉ là một chút thời gian không phải dành cho bất cứ việc gì.",
  },
  {
    id: "doc-lai",
    status: "published",
    slug: "doc-lai",
    title: "Đọc lại một cuốn sách cũ, gặp một người khác trong mình",
    category: "Đọc & viết",
    author: sampleAuthor,
    publishedAt: "2026-11-12",
    content: [
      { type: "paragraph", text: "Tôi tìm thấy cuốn sách trong một lần dọn kệ. Giữa hai trang là chiếc vé xe cũ, mực đã nhạt. Những dòng gạch chân vẫn còn nguyên, nhưng tôi không nhớ vì sao khi ấy mình lại chọn chúng. Cầm cuốn sách lên, tôi có cảm giác đang mở một lá thư do chính mình gửi từ nhiều năm trước." },
      { type: "heading", level: 2, text: "Trang sách không đứng yên" },
      { type: "paragraph", text: "Lần đọc đầu, tôi chỉ muốn biết câu chuyện kết thúc ra sao. Lần này, tôi dừng ở những đoạn nhân vật ngồi im, ở một cuộc trò chuyện tưởng như không quan trọng. Điều từng khiến tôi sốt ruột bây giờ lại là nơi tôi muốn ở lại lâu nhất." },
      { type: "blockquote", text: "Có những câu chữ cần thêm vài năm sống mới trở nên gần gũi." },
      { type: "paragraph", text: "Tôi không sửa những ghi chú cũ. Chúng thuộc về một cách nhìn khác, cũng có lý do để tồn tại. Bên cạnh đó, tôi viết thêm vài dòng bằng một màu mực mới. Hai lần đọc nằm cạnh nhau, không tranh phần đúng sai." },
      { type: "heading", level: 2, text: "Đọc lại mà không vội" },
      { type: "list", ordered: true, items: ["Chọn một cuốn từng để lại câu hỏi chưa có lời đáp.", "Đọc một đoạn ngắn, không ép mình hoàn thành cả cuốn.", "Ghi lại điều hôm nay khiến mình dừng mắt."] },
      { type: "paragraph", text: "Khi khép sách, tôi đặt chiếc vé trở lại chỗ cũ. Tôi chưa hiểu hết người đã gạch những dòng ấy, nhưng thấy thương sự háo hức của họ. Có lẽ vài năm nữa, tôi sẽ lại mở cuốn sách và gặp thêm một người khác trong mình." },
    ],
    excerpt: "Trang sách vẫn vậy, nhưng những dòng từng lướt qua bỗng trở nên gần gũi. Có lẽ đọc lại cũng là một cách nhận ra mình đã đổi thay.",
  },
  {
    id: "di-bo",
    status: "published",
    slug: "di-bo",
    title: "Đi bộ để nhìn thành phố gần hơn",
    category: "Quan sát",
    author: sampleAuthor,
    publishedAt: "2026-11-08",
    content: [
      { type: "paragraph", text: "Con đường từ nhà đến quán quen chỉ mất vài phút đi xe. Tôi đã qua đó nhiều lần mà không biết bên cạnh tiệm sửa khóa có một khoảng sân nhỏ. Hôm đi bộ, tôi nhìn thấy chiếc ghế gỗ dưới tán cây và một người đang ngồi nhặt rau trong nắng sớm." },
      { type: "heading", level: 2, text: "Thành phố ở ngang tầm mắt" },
      { type: "paragraph", text: "Đi chậm khiến mọi thứ có thêm chi tiết. Mùi bánh mới ra lò, tiếng kéo cửa, nét chữ đã phai trên một tấm biển. Những điều ấy vẫn luôn ở đó. Chỉ có tôi, khi vội đến một nơi khác, đã không dành đủ thời gian để nhận ra." },
      { type: "paragraph", text: "Tôi rẽ vào một con hẻm chưa từng đi. Một người chỉ cho tôi lối ra phía bên kia, rồi hỏi có phải tôi đang tìm nhà ai không. Tôi nói mình chỉ đi dạo. Câu trả lời đơn giản ấy làm cả hai cùng bật cười." },
      { type: "blockquote", text: "Có những con đường quen phải đi chậm một lần mới thật sự biết." },
      { type: "heading", level: 2, text: "Một lối về khác" },
      { type: "paragraph", text: "Trên đường về, tôi không cố ghi nhớ mọi thứ. Tôi chỉ chọn một hình ảnh: chiếc ghế gỗ trong sân, nơi bóng lá đang dịch dần qua mặt ghế. Thành phố bỗng bớt giống một bản đồ những điểm cần đến, và giống một nơi có thể ở lại." },
      { type: "paragraph", text: "Ngày mai có lẽ tôi lại đi xe. Nhưng tôi biết khoảng sân ấy tồn tại. Biết rằng bên cạnh nhịp vội quen thuộc còn có những nhịp sống khác, đủ gần để mình bước tới khi có một buổi sáng rảnh rang." },
    ],
    excerpt: "Rời khỏi những con đường quen thuộc, tôi gặp một hàng cây, một tiệm nhỏ và những câu chuyện vẫn diễn ra ngay bên cạnh mình.",
  },
  {
    id: "trang-giay",
    status: "published",
    slug: "trang-giay",
    title: "Bắt đầu từ một trang giấy trắng",
    category: "Đọc & viết",
    author: sampleAuthor,
    publishedAt: "2026-11-03",
    content: [
      { type: "paragraph", text: "Có một thời gian, tôi chỉ mở sổ khi đã nghĩ ra điều gì đáng viết. Kết quả là cuốn sổ nằm yên trên bàn khá lâu. Những ý nghĩ đến rồi đi trong lúc rửa bát, chờ xe, chuẩn bị ngủ. Đến khi ngồi xuống, tôi lại thấy chúng quá nhỏ để giữ lại." },
      { type: "heading", level: 2, text: "Viết trước khi biết mình muốn nói gì" },
      { type: "paragraph", text: "Một hôm tôi thử viết ngay câu đang nghĩ: hôm nay mình không biết bắt đầu từ đâu. Từ câu ấy, tôi kể về buổi chiều vừa qua, một cuộc hẹn bị hoãn và cảm giác nhẹ nhõm mà mình chưa muốn thừa nhận. Trang giấy dần có chữ mà không cần một kế hoạch rõ ràng." },
      { type: "blockquote", text: "Trang giấy có thể là nơi nghĩ, trước khi trở thành nơi trình bày." },
      { type: "heading", level: 3, text: "Một cách bắt đầu đơn giản" },
      { type: "list", ordered: true, items: ["Viết ngày tháng và một điều vừa nhìn thấy.", "Kể tiếp bằng những từ mình thường dùng khi nói.", "Đọc lại một lần, giữ câu khiến mình muốn viết thêm."] },
      { type: "paragraph", text: "Tôi không đăng phần lớn những trang ấy. Có đoạn lặp lại, có câu bỏ dở, có điều hôm sau đã thấy khác. Nhưng nhờ chúng, tôi nhận ra những mối bận tâm vẫn thường quay lại trong đời sống của mình." },
      { type: "paragraph", text: "Bây giờ, khi gặp một trang giấy trắng, tôi bớt nghĩ đến việc phải viết cho hay. Tôi bắt đầu bằng một chi tiết có thật. Phần còn lại có thể đến sau, hoặc không đến. Chỉ riêng việc ngồi xuống và lắng nghe đã là một khởi đầu đủ tốt." },
    ],
    excerpt: "Không phải ý nghĩ nào cũng cần trở thành một bài viết. Nhưng việc đặt chúng xuống giấy giúp tôi lắng nghe rõ hơn những điều còn dang dở.",
  },
  {
    id: "dieu-binh-thuong",
    status: "published",
    slug: "dieu-binh-thuong",
    title: "Giữ lại những điều bình thường",
    category: "Đời sống",
    author: sampleAuthor,
    publishedAt: "2026-10-28",
    content: [
      { type: "paragraph", text: "Trong điện thoại của tôi có nhiều ảnh chụp những chuyến đi, nhưng rất ít ảnh bữa cơm ở nhà. Có lẽ vì tôi luôn nghĩ những bữa cơm ấy sẽ còn lặp lại. Chiếc bàn, tiếng bát đũa, câu hỏi hôm nay có mệt không — tất cả quen đến mức không cần ghi nhớ." },
      { type: "heading", level: 2, text: "Điều quen thuộc cũng thay đổi" },
      { type: "paragraph", text: "Rồi một người chuyển đi xa, giờ ăn thay đổi, chiếc ghế bên cửa sổ được dời sang chỗ khác. Tôi mới nhận ra sự bình thường chưa bao giờ có nghĩa là mãi mãi. Nó chỉ là điều đang ở đây, vào lúc này, gần gũi đến mức mình dễ bỏ qua." },
      { type: "blockquote", text: "Những điều nhỏ bé không cần trở nên hiếm hoi mới đáng được quan tâm." },
      { type: "paragraph", text: "Tôi bắt đầu ghi lại vài điều cuối ngày. Không phải một bản tổng kết, chỉ là tiếng mưa khi vừa đóng cửa, món canh hơi mặn, câu chuyện ngắn trong cuộc gọi về nhà. Khi viết xuống, tôi thấy một ngày tưởng như chẳng có gì cũng có hình dáng riêng." },
      { type: "list", ordered: false, items: ["Một âm thanh khiến mình nhận ra đã về nhà.", "Một câu nói muốn nhớ lâu hơn hôm nay.", "Một việc nhỏ ai đó đã làm cho mình."] },
      { type: "paragraph", text: "Tôi vẫn chờ những chuyến đi và những cuộc gặp mới. Nhưng trong lúc chờ, tôi muốn có mặt nhiều hơn ở bàn ăn quen thuộc. Giữ lại những điều bình thường, với tôi, trước hết là dành cho chúng một chút chú ý khi chúng vẫn đang diễn ra." },
    ],
    excerpt: "Bữa cơm nhà, tiếng mưa cuối chiều, một cuộc gọi ngắn. Những điều nhỏ bé thường chỉ hiện rõ khi ta chịu chậm lại để nhìn.",
  },
];

export function getArticleBySlug(slug: string): SampleArticle | undefined {
  return sampleArticles.find((article) => article.slug === slug);
}

export function getRelatedArticles(article: SampleArticle): readonly SampleArticle[] {
  const others = sampleArticles.filter((candidate) => candidate.id !== article.id);
  return [
    ...others.filter((candidate) => candidate.category === article.category),
    ...others.filter((candidate) => candidate.category !== article.category),
  ].slice(0, 2);
}
