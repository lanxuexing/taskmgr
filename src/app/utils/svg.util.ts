import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * svg图标加载器
 * API文档: https://material.angular.io/components/icon/api
 * @param ir Icon注册器
 * @param ds Dom扫描器
 */
export const loadSvgResources = (ir: MatIconRegistry, ds: DomSanitizer) => {
    const imgDir = 'assets/img';
    const sidebarDir = `${imgDir}/sidebar`;
    const dayDir = `${imgDir}/days`;
    const avatar = `${imgDir}/avatar`;
    const iconsDir = `${imgDir}/icons`;
    // 侧滑菜单
    ir.addSvgIcon('day', ds.bypassSecurityTrustResourceUrl(`${sidebarDir}/day.svg`));
    ir.addSvgIcon('week', ds.bypassSecurityTrustResourceUrl(`${sidebarDir}/week.svg`));
    ir.addSvgIcon('month', ds.bypassSecurityTrustResourceUrl(`${sidebarDir}/month.svg`));
    ir.addSvgIcon('project', ds.bypassSecurityTrustResourceUrl(`${sidebarDir}/project.svg`));
    ir.addSvgIcon('projects', ds.bypassSecurityTrustResourceUrl(`${sidebarDir}/projects.svg`));
    // 日历
    const days = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
        11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31
    ];
    days.forEach((day: number) => ir.addSvgIcon(`day${day}`, ds.bypassSecurityTrustResourceUrl(`${dayDir}/day${day}.svg`)));
    // 头像
    ir.addSvgIconSetInNamespace('avatars', ds.bypassSecurityTrustResourceUrl(`${avatar}/avatars.svg`));
    ir.addSvgIcon('unassigned', ds.bypassSecurityTrustResourceUrl(`${avatar}/unassigned.svg`));
    // 图标
    ir.addSvgIcon('move', ds.bypassSecurityTrustResourceUrl(`${iconsDir}/move.svg`));
    ir.addSvgIcon('delete', ds.bypassSecurityTrustResourceUrl(`${iconsDir}/delete.svg`));
    ir.addSvgIcon('add', ds.bypassSecurityTrustResourceUrl(`${iconsDir}/add.svg`));
    ir.addSvgIcon('fingerprint', ds.bypassSecurityTrustResourceUrl('assets/fingerprint.svg'));
};
