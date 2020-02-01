import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * svg图标加载器
 * @param ir Icon注册器
 * @param ds Dom扫描器
 */
export const loadSvgResources = (ir: MatIconRegistry, ds: DomSanitizer) => {
    ir.addSvgIcon('gifts', ds.bypassSecurityTrustResourceUrl('assets/fingerprint.svg'));
};
