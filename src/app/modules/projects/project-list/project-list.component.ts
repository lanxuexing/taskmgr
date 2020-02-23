import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, switchMap, take, tap } from 'rxjs/operators';
import { Project, User } from '../../../models';
import { fadeIn } from '../../../share';
import { ConfirmDialogComponent } from '../../../share/confirm-dialog';
import { ProjectAddComponent } from '../project-add';
import { ProjectInviteComponent } from '../project-invite';
import { ProjectService, UserService, ToastService } from './../../../services';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [fadeIn],
  /**
   * ChangeDetection
   * 检测程序内部状态，然后反应到UI上边
   * 引起状态变化：Events、XHR、Timers
   * ApplicationRef监听NgZone的onTurnDone，然后执行检测。
   * 默认是default模式，全局检测CD Tree。
   */
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit {
  projects$: Observable<Project[]>;
  userId: string;

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private userService: UserService,
    private toastService: ToastService,
    private cdf: ChangeDetectorRef
  ) {
    this.route.queryParams.pipe(
      take(1),
      filter(result => result as any),
      tap(params => {
        this.userId = params.userId;
      })
    ).subscribe();
  }

  ngOnInit() {
    this.initProjectList();
  }

  // 初始化项目列表
  initProjectList() {
    this.projects$ = this.projectService.getProject(this.userId);
    this.cdf.markForCheck();
  }

  // 添加
  onAdd() {
    const dialogRef = this.dialog.open(ProjectAddComponent, {
      data: {
        title: '新建项目'
      }
    });
    dialogRef.afterClosed().pipe(
      take(1),
      filter(result => result),
      switchMap(project => this.projectService.addProject(
        Object.assign({}, project, {
          members: [this.userId]
        }),
        this.userId
      )),
      tap(_ => this.initProjectList())
    ).subscribe();
  }

  // 编辑
  onEdit(item: Project) {
    const dialogRef = this.dialog.open(ProjectAddComponent, {
      data: {
        title: '编辑项目',
        project: item
      }
    });
    dialogRef.afterClosed().pipe(
      take(1),
      filter(result => result),
      switchMap(project => this.projectService.updateProject(project)),
      tap(_ => this.initProjectList())
    ).subscribe();
  }

  // 邀请
  onInvite(project: Project) {
    const dialogRef = this.dialog.open(ProjectInviteComponent, {
      autoFocus: false,
      data: project.members
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) { return; }
      const userList = result.members || [];
      if (userList.length > 0) {
        const ids = userList.map((item: User) => item.id);
        const tempPrj = Object.assign({}, project, {members: [...ids]});
        this.userService.updateBatchUserOfProject(tempPrj).subscribe(res => {
          if (res && res.length > 0) {
            this.toastService.toast('操作成功～');
            this.initProjectList();
          }
        });
      }
    });
  }

  // 删除
  onDelete(item: Project) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: '重要提示',
        content: '您确认要删除该项目吗?'
      }
    });
    dialogRef.afterClosed().pipe(
      take(1),
      filter(result => result),
      switchMap(_ => this.projectService.deleteProject(item)),
      tap(_ => this.initProjectList())
    ).subscribe();
  }

}
