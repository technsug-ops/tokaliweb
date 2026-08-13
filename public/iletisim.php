<?php
/**
 * İletişim formu alıcısı — All-Inkl (PHP) üzerinde çalışır.
 *
 * Mesajı doğrular ve büronun kutusuna e-posta olarak gönderir. Hiçbir yere
 * kaydetmez: veri tabanı yok, dosyaya yazma yok. Mesaj yalnızca posta kutusunda
 * durur.
 *
 * Vercel gibi PHP çalıştırmayan ortamlarda bu dosya çalışmaz; istemci tarafı
 * bunu algılayıp mailto taslağına düşer (bkz. components/ContactForm.tsx).
 */

declare(strict_types=1);

const RECIPIENT   = 'info@tokalihukuk.com.tr';
const SITE_NAME   = 'Tokalı Hukuk & Danışmanlık';
const MAX_NAME    = 120;
const MAX_EMAIL   = 190;
const MAX_MESSAGE = 5000;

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

/* Dönüş tipi bilerek yazılmadı: `never` PHP 8.1+ gerektiriyor, hesabın
   çalıştığı sürüm garanti değil. Bu hâliyle PHP 7.4 ve üstünde çalışır. */
function fail(int $status, string $message)
{
    http_response_code($status);
    echo json_encode(['ok' => false, 'error' => $message], JSON_UNESCAPED_UNICODE);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    fail(405, 'Yalnızca POST kabul edilir.');
}

/* Gövde hem JSON hem klasik form gönderimi olarak gelebilir. */
$raw = file_get_contents('php://input') ?: '';
$data = json_decode($raw, true);
if (!is_array($data)) {
    $data = $_POST;
}

$get = static function (string $key) use ($data): string {
    $value = $data[$key] ?? '';
    return is_string($value) ? trim($value) : '';
};

/* Bal küpü: gerçek ziyaretçi bu alanı göremez, botlar doldurur.
   Dolu geldiğinde başarı döneriz — bot yeniden denemesin. */
if ($get('website') !== '') {
    echo json_encode(['ok' => true], JSON_UNESCAPED_UNICODE);
    exit;
}

$name    = $get('name');
$email   = $get('email');
$message = $get('message');

if (mb_strlen($name) < 2 || mb_strlen($name) > MAX_NAME) {
    fail(422, 'Lütfen adınızı yazın.');
}
if (mb_strlen($email) > MAX_EMAIL || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    fail(422, 'Geçerli bir e-posta adresi yazın.');
}
if (mb_strlen($message) < 10 || mb_strlen($message) > MAX_MESSAGE) {
    fail(422, 'Lütfen en az 10 karakterlik bir açıklama bırakın.');
}

/* Başlık enjeksiyonu koruması: satır sonu içeren değer başlıklara girmez. */
$clean = static fn (string $v): string => str_replace(["\r", "\n", "\0"], ' ', $v);
$safeName  = $clean($name);
$safeEmail = $clean($email);

/* Türkçe karakterli konu başlığı MIME ile kodlanır, yoksa bozuk görünür. */
$subject = '=?UTF-8?B?' . base64_encode('Web sitesi — görüşme talebi: ' . $safeName) . '?=';

$body = implode("\n", [
    'Ad Soyad : ' . $safeName,
    'E-posta  : ' . $safeEmail,
    'Tarih    : ' . date('d.m.Y H:i'),
    'IP       : ' . ($_SERVER['REMOTE_ADDR'] ?? '-'),
    '',
    str_repeat('-', 48),
    '',
    $message,
    '',
    str_repeat('-', 48),
    'Bu mesaj ' . SITE_NAME . ' web sitesindeki iletişim formundan gönderildi.',
]);

/* Gönderen kendi alan adımız olmalı; ziyaretçinin adresi From'a yazılırsa
   SPF/DMARC nedeniyle spam'e düşer. Yanıt ziyaretçiye gitsin diye Reply-To. */
$headers = implode("\r\n", [
    'From: ' . SITE_NAME . ' <' . RECIPIENT . '>',
    'Reply-To: ' . $safeName . ' <' . $safeEmail . '>',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'MIME-Version: 1.0',
    'X-Mailer: tokalihukuk.com.tr',
]);

if (!mail(RECIPIENT, $subject, $body, $headers)) {
    fail(500, 'Mesaj gönderilemedi.');
}

echo json_encode(['ok' => true], JSON_UNESCAPED_UNICODE);
