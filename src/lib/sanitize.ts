import DOMPurify from 'dompurify';

/**
 * HTML 콘텐츠를 살균하여 XSS 공격을 방지합니다.
 * iframe(교재), img, code 블록 등은 허용합니다.
 */
export function sanitizeHTML(dirty: string): string {
    if (typeof window === 'undefined') return dirty;

    return DOMPurify.sanitize(dirty, {
        ADD_TAGS: ['iframe'],
        ADD_ATTR: ['target', 'rel', 'style', 'class', 'data-code', 'onclick'],
        ALLOW_DATA_ATTR: true,
        ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto|tel):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
    });
}
